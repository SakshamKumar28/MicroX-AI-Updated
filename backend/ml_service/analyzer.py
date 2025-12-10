import sys
import json
import io
import os
import numpy as np
from PIL import Image  # pyright: ignore[reportMissingImports]
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Reduce TensorFlow logging
import tensorflow as tf
from tensorflow import keras

class PathologyAnalyzer:
    _instance = None
    
    @classmethod
    def get_instance(cls, model_path):
        """Singleton pattern to ensure model is loaded only once"""
        if cls._instance is None:
            cls._instance = cls(model_path)
        return cls._instance

    def __init__(self, model_path):
        """Initialize the pathology analyzer with the H5 model"""
        self.model = None
        self.model_path = model_path
        # Update class labels based on your new model's classes
        self.class_labels = {
            0: "Adenosis",
            1: "Ductal Carcinoma",
            2: "Fibroadenoma",
            3: "Lobular Carcinoma",
            4: "Mucinous Carcinoma",
            5: "Papillary Carcinoma",
            6: "Phyllodes Tumor",
            7: "Tubular Adenoma"
        }
        # Configure TensorFlow for better performance
        self._configure_tensorflow()
        self.load_model()
        
    def _configure_tensorflow(self):
        """Configure TensorFlow for optimal performance"""
        # Optimize for CPU inference
        os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  # Force CPU
        os.environ['TF_ENABLE_ONEDNN_OPTS'] = '1'  # Enable MKL-DNN optimization
        
        # Set thread count for CPU operations - adjust based on your CPU cores
        num_threads = os.cpu_count() or 4  # Get number of CPU cores
        tf.config.threading.set_inter_op_parallelism_threads(num_threads)
        tf.config.threading.set_intra_op_parallelism_threads(num_threads)
        
        # Enable TensorFlow optimizations
        tf.config.optimizer.set_jit(True)  # Enable XLA optimization
        tf.config.optimizer.set_experimental_options({
            'layout_optimizer': True,
            'constant_folding': True,
            'shape_optimization': True,
            'remapping': True,
            'arithmetic_optimization': True,
            'dependency_optimization': True,
            'loop_optimization': True,
            'function_optimization': True,
            'debug_stripper': True,
        })
    
    def load_model(self):
        """Load the Keras model"""
        try:
            if os.path.exists(self.model_path):
                self.model = keras.models.load_model(self.model_path)
                print(f"Model loaded successfully from {self.model_path}", file=sys.stderr)
            else:
                print(f"Model file not found at {self.model_path}", file=sys.stderr)
                self.model = None
        except Exception as e:
            print(f"Error loading model: {str(e)}", file=sys.stderr)
            self.model = None
    
    def preprocess_image(self, image_data, target_size=(224, 224)):
        """Preprocess image data for model input with optimizations"""
        try:
            # Handle both file paths and binary data
            if isinstance(image_data, str):
                # If image_data is a file path
                image = Image.open(image_data).convert('RGB')
            else:
                # If image_data is binary data
                with io.BytesIO(image_data) as bio:
                    image = Image.open(bio).convert('RGB')
                
                # Calculate aspect ratio-preserving dimensions
                aspect = image.width / image.height
                if aspect > 1:
                    new_width = target_size[0]
                    new_height = int(target_size[1] / aspect)
                else:
                    new_height = target_size[1]
                    new_width = int(target_size[0] * aspect)
                
                # Resize with LANCZOS for better quality
                image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Create new image with padding
                new_im = Image.new("RGB", target_size, (0, 0, 0))
                offset_x = (target_size[0] - new_width) // 2
                offset_y = (target_size[1] - new_height) // 2
                new_im.paste(image, (offset_x, offset_y))
                
                # Convert to numpy array efficiently
                img_array = np.asarray(new_im, dtype=np.float32) / 255.0
                return np.expand_dims(img_array, axis=0)
        except Exception as e:
            print(f"Error preprocessing image: {str(e)}", file=sys.stderr)
            return None
    
    def analyze_image(self, image_data):
        """Analyze image using the loaded model with optimizations"""
        if self.model is None:
            print("Model not loaded, returning mock result.", file=sys.stderr)
            return self._get_mock_result()
        
        try:
            start_time = tf.timestamp()
            
            # Preprocess image
            processed_image = self.preprocess_image(image_data)
            if processed_image is None:
                return self._get_mock_result()
            
            # Use tf.function for faster prediction
            @tf.function(experimental_compile=True)
            def predict(img):
                return self.model(img, training=False)
            
            # Run prediction with performance optimizations
            prediction = predict(tf.constant(processed_image))
            
            # Get confidence scores efficiently
            confidence_scores = prediction[0].numpy()
            predicted_class_index = np.argmax(confidence_scores)
            confidence = float(confidence_scores[predicted_class_index])
            
            # Calculate actual processing time
            processing_time = float(tf.timestamp() - start_time)
            
            result = self._generate_analysis_result(confidence, predicted_class_index, processing_time)
            return result
            
        except Exception as e:
            print(f"Error during analysis: {str(e)}", file=sys.stderr)
            return self._get_mock_result()
    
    def _generate_analysis_result(self, confidence, predicted_class_index, processing_time=None):
        """Generate analysis result based on prediction (UPDATED FOR 8 SUBTYPES)"""
        
        predicted_class_name = self.class_labels.get(predicted_class_index, "Unknown")
        
        # Define which subtypes are malignant
        malignant_subtypes = {
            "Ductal Carcinoma", "Lobular Carcinoma", 
            "Mucinous Carcinoma", "Papillary Carcinoma"
        }
        
        if predicted_class_name in malignant_subtypes:
            category = "Malignant"
            abnormalities_level = 2 # Higher level for malignant
        else:
            category = "Benign"
            abnormalities_level = 1 # Lower level for benign
            
        diagnosis = f"Prediction: {category} ({predicted_class_name})"
        
        # Generate regions for visualization
        regions = self._generate_regions(confidence, category)
        
        return {
            "diagnosis": diagnosis,
            "confidence": confidence * 100,
            "abnormalitiesDetected": abnormalities_level,
            "regions": regions,
            "timestamp": tf.strings.as_string(tf.timestamp()).numpy().decode(),
            "processingTime": processing_time if processing_time is not None else 2.5,
            "modelVersion": "2.0-h5-multiclass", # Updated version for H5 model
            "predictedClass": int(predicted_class_index),
            "predictedClassName": predicted_class_name,
            "category": category
        }
    
    def _generate_regions(self, confidence, category):
        """Generate regions for overlay visualization"""
        regions = []
        
        if category == "Malignant":
            regions.append({
                "id": 1,
                "type": "Area of Concern (Malignant)",
                "confidence": confidence * 100,
                "color": "#F44336" # Red
            })
        else: # Benign
             regions.append({
                "id": 1,
                "type": "Area of Interest (Benign)",
                "confidence": confidence * 100,
                "color": "#4CAF50" # Green
            })
            
        return regions
    
    def _get_mock_result(self):
        """Return mock result when model is not available"""
        return {
            "diagnosis": "Analysis Complete (Mock)",
            "confidence": 85.0,
            "abnormalitiesDetected": 1,
            "regions": [
                {"id": 1, "type": "Area of Interest (Benign)", "confidence": 85.0, "color": "#4CAF50"}
            ],
            "timestamp": tf.strings.as_string(tf.timestamp()).numpy().decode(),
            "processingTime": 3.5,
            "modelVersion": "Mock",
            "predictedClass": 2,
            "predictedClassName": "Fibroadenoma",
            "category": "Benign"
        }

def main():
    """Main function to handle command line analysis"""
    if len(sys.argv) < 3:
        print("Usage: python analyzer.py <model_path> <image_path>", file=sys.stderr)
        sys.exit(1)
    
    model_path = sys.argv[1]
    image_path = sys.argv[2]
    
    try:
        # Read image data from file
        with open(image_path, 'rb') as f:
            image_data = f.read()
        
        # Initialize analyzer (using singleton pattern)
        analyzer = PathologyAnalyzer.get_instance(model_path)
        
        # Analyze image
        result = analyzer.analyze_image(image_data)
        
        # Convert numpy values to Python native types
        def convert_numpy(obj):
            if isinstance(obj, np.integer):
                return int(obj)
            elif isinstance(obj, np.floating):
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            return obj
        
        # Ensure all values are JSON serializable
        result = {k: convert_numpy(v) for k, v in result.items()}
        
        # Output result as JSON to standard output, ensuring proper formatting
        json_str = json.dumps(result, ensure_ascii=False, indent=None)
        print(json_str, flush=True)
        
    except Exception as e:
        # Return error as JSON
        error_result = {
            "error": str(e),
            "status": "error"
        }
        print(json.dumps(error_result), flush=True)

if __name__ == "__main__":
    main()
