import sys
from pathlib import Path

# Add backend_python to path
sys.path.append(str(Path(__file__).parent.parent))

def test_imports():
    print("Testing imports...")
    try:
        from app.main import app
        print("Successfully imported app.main")
        
        from app.models.user import User
        print("Successfully imported User model")
        
        from app.models.image import Image
        print("Successfully imported Image model")
        
        from app.services.ml_service import MLService
        print("Successfully imported MLService")
        
        print("ALL IMPORTS PASSED")
    except Exception as e:
        print(f"IMPORT ERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_imports()
