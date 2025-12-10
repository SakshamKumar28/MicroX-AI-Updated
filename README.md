# MicroX-AI 🔬
> **Precision Diagnostics for the Modern Era.**
> Democratizing access to clinical-grade histopathology analysis through artificial intelligence.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/backend-FastAPI-green)
![React](https://img.shields.io/badge/frontend-React-blue)
![TensorFlow](https://img.shields.io/badge/AI-TensorFlow-orange)

## 📋 Overview

**MicroX-AI** is an advanced medical imaging platform designed to assist pathologists and researchers in analyzing histology slides with unprecedented speed and accuracy. Leveraging state-of-the-art Deep Learning models (CNNs), it detects pathological patterns in seconds, providing detailed confidence reports and reducing diagnostic turnaround times.

This repository contains the full source code for the MicroX-AI platform, including the React frontend and the FastAPI + TensorFlow backend.

## ✨ Key Features

*   **⚡ Instant AI Analysis**: Drag-and-drop secure upload for histology slides with sub-second inference time.
*   **📊 Interactive Dashboard**: track analysis history, patient metrics, and diagnostic trends.
*   **📝 Professional Reporting**: Generate and download clinical-grade PDF reports with detailed findings.
*   **🔒 Secure & Private**: HIPAA-compliant design with encrypted patient data storage.
*   **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS v3
*   **Routing**: React Router DOM
*   **State Management**: React Hooks

### Backend
*   **API**: FastAPI (Python)
*   **Database**: MongoDB (via Motor & Beanie ODM)
*   **AI/ML**: TensorFlow / Keras
*   **Storage**: Cloudinary (Image CDN)
*   **Authentication**: JWT & BCrypt

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   Python (v3.9+)
*   MongoDB Atlas Account
*   Cloudinary Account

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# (See .env.example)
```

**Run Server:**
```bash
uvicorn app.main:app --reload
# Backend will run on http://localhost:8000
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://localhost:8000/api

# Run Dev Server
npm run dev
# Frontend will run on http://localhost:5173
```

## 🌍 Deployment

### Backend (Render)
This project includes a `render.yaml` for automated Blueprints deployment.
1.  Connect your repo to [Render](https://render.com).
2.  Select "New Blueprint".
3.  Render will auto-deploy the Python service.

### Frontend (Netlify)
1.  Connect your repo to [Netlify](https://netlify.com).
2.  Set build command: `npm run build`.
3.  Set publish directory: `dist`.
4.  Add Environment Variable: `VITE_API_URL` pointing to your Render backend URL.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
**MicroX-AI** — *Empowering Healthcare with Speed and Accuracy.*