from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
from ..models.user import User
from ..utils.auth import get_password_hash, verify_password, create_access_token
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr

class AuthResponse(BaseModel):
    user: UserResponse
    token: str

@router.post("/signup", response_model=AuthResponse)
async def signup(user_data: UserSignup):
    if await User.find_one(User.email == user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        name=user_data.name, 
        email=user_data.email, 
        password_hash=hashed_password
    )
    await new_user.create()
    
    token = create_access_token(data={"sub": str(new_user.id)})
    
    return {
        "user": {"id": str(new_user.id), "name": new_user.name, "email": new_user.email},
        "token": token
    }

@router.post("/login", response_model=AuthResponse)
async def login(credentials: UserLogin):
    user = await User.find_one(User.email == credentials.email)
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "user": {"id": str(user.id), "name": user.name, "email": user.email},
        "token": token
    }

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    # Stateless JWT, just return success. Client should discard token.
    return {"message": "Logged out successfully"}

@router.get("/verify")
async def verify(current_user: User = Depends(get_current_user)):
    return {
        "valid": True,
        "userId": str(current_user.id),
        "user": {"id": str(current_user.id), "name": current_user.name, "email": current_user.email}
    }
