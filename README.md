# MicroX-AI: Medical Image Analysis Platform

![MicroX-AI Banner](./frontend/src/assets/hero-bg.png)

## Overview
MicroX-AI is a cutting-edge medical image analysis platform that leverages artificial intelligence to detect and analyze pathological patterns in medical images. Built with modern web technologies and advanced machine learning, it provides healthcare professionals with rapid, accurate, and reliable image analysis.

## Key Features

- 🔬 **AI-Powered Analysis**
  - Advanced pathology detection
  - Multiple classification categories
  - Confidence scoring system
  - Region-specific analysis

- 🔐 **Secure Platform**
  - JWT-based authentication
  - Encrypted data transmission
  - Secure image storage
  - Role-based access control

- 📊 **Comprehensive Dashboard**
  - Intuitive image management
  - Real-time analysis results
  - Historical data tracking
  - PDF report generation

- 📱 **Responsive Design**
  - Mobile-friendly interface
  - Cross-browser compatibility
  - Optimized performance
  - Accessible UI/UX

## Technology Stack

### Frontend
- **React** with Vite
- **TailwindCSS** for styling
- **TanStack Query** for data management
- **Axios** for API communication

### Backend
- **Node.js** & Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Cloudinary** for image storage

### AI/ML
- **Python** 3.8+
- **TensorFlow/Keras**
- **NumPy** & Pillow
- Custom ML models

## Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
Python >= 3.8
MongoDB Atlas Account
Cloudinary Account
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/microx-ai.git
cd microx-ai
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up Environment Variables**

Backend (.env):
```env
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend (.env):
```env
VITE_API_URL=http://localhost:5000
```

5. **Initialize ML Environment**
```bash
cd ../backend/ml-service
python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run dev
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints
- POST `/api/auth/signup` - Create new user account
- POST `/api/auth/login` - User login
- GET `/api/auth/verify` - Verify JWT token

### Image Analysis Endpoints
- POST `/api/images/upload` - Upload new image
- POST `/api/images/:id/analyze` - Analyze specific image
- GET `/api/images` - List all images
- DELETE `/api/images/:id` - Delete specific image

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Medical imaging dataset providers
- Open-source ML model contributors
- Healthcare professionals who provided valuable feedback

## Support

For support, email support@microx-ai.com or open an issue in the repository.