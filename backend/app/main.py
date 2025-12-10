from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import init_db
from .routes import auth, images

app = FastAPI(title="MicroX-AI Backend")

# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]
if settings.CLIENT_ORIGIN:
    origins.append(settings.CLIENT_ORIGIN)
if settings.CLIENT_ORIGINS:
    origins.extend([o.strip() for o in settings.CLIENT_ORIGINS.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "backend": "python-fastapi"}

app.include_router(auth.router)
app.include_router(images.router)
