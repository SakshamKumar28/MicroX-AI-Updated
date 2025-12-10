import sys
import os
import asyncio
from pathlib import Path
from ..config import settings

# Add backend_python root to sys.path to find ml_service
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))

# Import the analyzer class
# We assume ml_service/analyzer.py exists and has PathologyAnalyzer class
from ml_service.analyzer import PathologyAnalyzer

class MLService:
    _analyzer = None

    @classmethod
    def get_analyzer(cls):
        if not cls._analyzer:
            model_path = str(BASE_DIR / settings.ML_MODEL_PATH)
            print(f"Loading model from: {model_path}")
            cls._analyzer = PathologyAnalyzer.get_instance(model_path)
        return cls._analyzer

    @classmethod
    async def analyze_image(cls, image_data: bytes):
        """
        Run analysis in a separate thread to avoid blocking the event loop.
        """
        analyzer = cls.get_analyzer()
        loop = asyncio.get_event_loop()
        # analyzer.analyze_image is synchronous (CPU bound), run in executor
        result = await loop.run_in_executor(None, analyzer.analyze_image, image_data)
        return result
