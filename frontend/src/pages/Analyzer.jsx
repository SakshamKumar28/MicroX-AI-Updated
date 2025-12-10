import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, File, X, Info, Microscope } from 'lucide-react';
import { uploadImage, analyzeImage } from '../services/api';

const Analyzer = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setError(null);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const selected = e.dataTransfer.files[0];
        if (selected && selected.type.startsWith('image/')) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setError(null);
        } else {
            setError("Please upload an image file (JPG, PNG)");
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please select an image first");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Upload
            const uploadRes = await uploadImage(file);
            const imageId = uploadRes.id || uploadRes._id; 

            // 2. Analyze
            const analysisRes = await analyzeImage(imageId);
            
            // 3. Navigate to result
            // Pass analysisRes.analysis as 'result' because AnalysisResult expects the flat analysis data
            navigate(`/analysis/${imageId}`, { state: { result: analysisRes.analysis, imageUrl: analysisRes.url } });

        } catch (err) {
            console.error(err);
            setError(err.detail || "Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="px-4 py-1 border border-primary/20 bg-primary/5 text-primary rounded-full text-sm font-medium tracking-wide uppercase mb-4 inline-block">
                        AI Diagnostics
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">Microscopic Analyzer</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Upload histology slides or microscopic images for instant AI-powered classification and analysis.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
                    {/* Upload Area */}
                    <div 
                        className={`border-4 border-dashed rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center transition-colors min-h-[300px] md:min-h-[400px] relative ${
                            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {preview ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="max-h-[350px] rounded-2xl shadow-lg object-contain"
                                />
                                <button 
                                    onClick={() => { setFile(null); setPreview(null); }}
                                    className="absolute -top-4 -right-4 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                    <Microscope size={40} />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-2">Drag & Drop Slide</h3>
                                <p className="text-gray-500 mb-8">or click to browse files (PNG, JPG, TIFF)</p>
                                <input 
                                    type="file" 
                                    id="fileInput" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <label 
                                    htmlFor="fileInput"
                                    className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors cursor-pointer"
                                >
                                    Select Image
                                </label>
                            </>
                        )}
                        
                        {loading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
                                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-xl font-bold text-primary animate-pulse">Analyzing Tissue...</p>
                                <p className="text-gray-500 mt-2">Processing Neural Network Layers</p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                             <Info size={20} />
                             {error}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={handleAnalyze}
                            disabled={!file || loading}
                            className="px-8 py-4 bg-dark text-white rounded-full font-bold hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Run Analysis
                        </button>
                    </div>
                </div>

                {/* Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center text-gray-500 text-sm">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <span className="block w-8 h-8 bg-secondary/20 rounded-full mx-auto mb-3 text-secondary font-bold flex items-center justify-center">1</span>
                        Ensure image is clear and in focus (40x, 100x).
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <span className="block w-8 h-8 bg-secondary/20 rounded-full mx-auto mb-3 text-secondary font-bold flex items-center justify-center">2</span>
                         Upload to the secure analysis platform.
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                         <span className="block w-8 h-8 bg-secondary/20 rounded-full mx-auto mb-3 text-secondary font-bold flex items-center justify-center">3</span>
                        Review classification and confidence score.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analyzer;
