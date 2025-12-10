from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App
    PORT: int = 5000
    CLIENT_ORIGIN: str = "http://localhost:5173"
    CLIENT_ORIGINS: str = ""
    
    # DB
    MONGODB_URI: str
    DB_NAME: str = "microx_ai"
    
    # Auth
    JWT_SECRET: str = "dev-secret"
    JWT_EXPIRE_MINUTES: int = 60 * 24 # 1 day by default
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    # ML
    ML_MODEL_PATH: str = "ml_service/pathology_model.h5" 
    
    @property
    def DATABASE_URL(self):
        return self.MONGODB_URI
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
