from typing import Optional, List, Any, Dict
from beanie import Document, Link
from pydantic import Field
from datetime import datetime
from .user import User

class ImageAnalysis(Document):
    result: Dict[str, Any] = {}
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    model_version: Optional[str] = None
    expires_at: Optional[datetime] = None

class Image(Document):
    owner: Link[User]
    public_id: str = Field(..., description="Cloudinary Public ID")
    url: str
    original_filename: Optional[str] = None
    format: Optional[str] = None
    bytes: Optional[int] = None
    width: Optional[int] = None
    height: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = {}
    tags: List[str] = []
    
    # Embedding analysis directly or as a sub-document
    # Since existing schema had checking "analysis.expiresAt" index, likely it's embedded.
    analysis: Optional[Dict[str, Any]] = None # Using Dict for flexibility matching original schema

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "images"
        indexes = [
            "owner",
            "public_id",
            "analysis.expires_at",
            "analysis.model_version"
        ]
