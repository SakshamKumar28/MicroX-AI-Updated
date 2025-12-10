from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .models.user import User
from .models.image import Image
from .config import settings

async def init_db():
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    await init_beanie(database=client[settings.DB_NAME], document_models=[User, Image])
