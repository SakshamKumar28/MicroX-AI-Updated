from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from typing import List, Optional
import cloudinary
import cloudinary.uploader
from ..models.image import Image, ImageAnalysis
from ..models.user import User
from ..dependencies import get_current_user
from ..services.ml_service import MLService
from ..config import settings
import httpx

router = APIRouter(prefix="/api/images", tags=["Images"])

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

@router.get("/", response_model=List[Image])
async def list_images(current_user: User = Depends(get_current_user)):
    # Return all images for the logged in user
    return await Image.find(Image.owner.id == current_user.id).sort(-Image.created_at).to_list()

@router.post("/upload", response_model=Image)
async def upload_image(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user)
):
    try:
        # Upload to Cloudinary
        # We can stream file.file directly
        result = cloudinary.uploader.upload(
            file.file, 
            folder="microx-ai",
            overwrite=True,
            resource_type="image"
        )
        
        # Create Image record
        image = Image(
            owner=current_user,
            public_id=result.get("public_id"),
            url=result.get("secure_url"),
            original_filename=file.filename,
            format=result.get("format"),
            bytes=result.get("bytes"),
            width=result.get("width"),
            height=result.get("height"),
            metadata=result,
            tags=[]
        )
        await image.create()
        return image
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.post("/{image_id}/analyze", response_model=Image)
async def analyze_image(
    image_id: str,
    current_user: User = Depends(get_current_user)
):
    image = await Image.get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
        
    # Manual ownership verification
    # Beanie generic Link field stores id in .ref.id usually
    owner_id = image.owner.ref.id if hasattr(image.owner, 'ref') else image.owner.id
    
    if str(owner_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")

    try:
        # Download image data
        async with httpx.AsyncClient() as client:
            resp = await client.get(image.url)
            if resp.status_code != 200:
                raise HTTPException(status_code=400, detail="Failed to download image from storage")
            image_data = resp.content

        # Run analysis
        analysis_result = await MLService.analyze_image(image_data)
        
        # Update image
        image.analysis = analysis_result
        await image.save()
        
        return image
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.delete("/{image_id}")
async def delete_image(image_id: str, current_user: User = Depends(get_current_user)):
    image = await Image.get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
        
    owner_id = image.owner.ref.id if hasattr(image.owner, 'ref') else image.owner.id
    if str(owner_id) != str(current_user.id):
        raise HTTPException(status_code=404, detail="Image not found")
        
    # Delete from Cloudinary
    try:
        cloudinary.uploader.destroy(image.public_id)
    except:
        pass # Continue to delete from DB even if cloud delete fail (orphaned)
        
    await image.delete()
    return {"message": "Image deleted"}
