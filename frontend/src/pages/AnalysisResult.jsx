import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowLeft, Share2, Download, FileText } from 'lucide-react';

const AnalysisResult = () => {
    const { state } = useLocation();
    const { id } = useParams();

    if (!state || !state.result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-xl text-gray-500 mb-4">No analysis result found.</p>
                <Link to="/analyzer" className="px-6 py-3 bg-primary text-white rounded-full">
                    Start Analysis
                </Link>
            </div>
        );
    }

    const { result, imageUrl } = state;
    const isBenign = result.category === "Benign"; 
    
    // Determine color based on malignancy
    const statusColor = isBenign ? "green" : "red";
    const StatusIcon = isBenign ? CheckCircle : AlertTriangle;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `MicroX Analysis: ${result.predictedClassName}`,
                    text: `Check out this pathology analysis report for ${result.predictedClassName} with ${result.confidence.toFixed(1)}% confidence.`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const handleDownload = () => {
        window.print();
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const reportDate = new Date(result.timestamp || Date.now()).toLocaleDateString();
    
    return (
        <div className="min-h-screen bg-light pt-24 pb-12 print:p-0 print:bg-white">
            {/* Screen-only Container */}
            <div className="container mx-auto px-6 max-w-5xl print:hidden">
                <Link to="/analyzer" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors inline-block">
                    <ArrowLeft size={20} /> Back to Analyzer
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image */}
                    <div>
                        <div className="bg-white rounded-[2rem] p-4 shadow-xl mb-8">
                            <img 
                                src={imageUrl} 
                                alt="Analyzed Sample" 
                                className="w-full h-auto rounded-3xl object-cover"
                            />
                        </div>
                        
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <FileText size={20} /> Raw Data
                             </h3>
                             <pre className="bg-gray-50 p-4 rounded-xl text-xs overflow-auto max-h-60 text-gray-600 font-mono">
                                 {JSON.stringify(result, null, 2)}
                             </pre>
                        </div>
                    </div>

                    {/* Right: Diagnosis */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 bg-${statusColor}-100 text-${statusColor}-600 rounded-full flex items-center justify-center`}>
                                    <StatusIcon size={24} />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Pathology Report</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">
                                {result.predictedClassName}
                            </h1>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
                                    {(result.confidence).toFixed(2)}% Confidence
                                </div>
                                <div className={`px-4 py-2 rounded-full text-sm font-bold ${isBenign ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {result.category}
                                </div>
                            </div>

                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                The AI model successfully analyzed the tissue sample. 
                                The identified pattern correlates strongly with <strong>{result.predictedClassName}</strong>.
                                <br/><br/>
                                <span className="italic text-sm text-gray-400">Disclaimer: This result is generated by AI and should be verified by a certified pathologist.</span>
                            </p>
                        </div>

                        {/* Recommendation Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-l-8 border-secondary">
                            <h3 className="text-2xl font-display font-bold mb-4">Clinical Recommendations</h3>
                            {isBenign ? (
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex gap-3">
                                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                                        No immediate intervention required based on current analysis.
                                    </li>
                                    <li className="flex gap-3">
                                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                                        Continue routine screening protocol.
                                    </li>
                                </ul>
                            ) : (
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex gap-3">
                                        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                                        Urgent pathologist review recommended.
                                    </li>
                                    <li className="flex gap-3">
                                        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                                        Consider confirmatory biopsy or additional staining.
                                    </li>
                                    <li className="flex gap-3">
                                        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                                        Correlate with clinical history.
                                    </li>
                                </ul>
                            )}
                        </div>

                         <div className="flex gap-4 print:hidden">
                            <button onClick={handleShare} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                                <Share2 size={20} /> Secure Share
                            </button>
                            <button onClick={handleDownload} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-light flex items-center justify-center gap-2 transition-colors">
                                <Download size={20} /> Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* PRINT-ONLY Medical Report Layout */}
            <div className="hidden print:block p-8 max-w-[210mm] mx-auto bg-white text-dark">
                 {/* Header */}
                 <div className="flex justify-between items-start border-b-4 border-dark pb-6 mb-8">
                     <div>
                         <h1 className="text-3xl font-black uppercase tracking-widest text-dark">MicroX<span className="text-yellow-500">.</span>AI</h1>
                         <p className="text-sm font-bold text-gray-500 tracking-wider">Advanced Digital Pathology Laboratory</p>
                     </div>
                     <div className="text-right">
                         <h2 className="text-xl font-bold">Diagnostic Report</h2>
                         <p className="text-sm text-gray-500">Report ID: {`MX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}</p>
                         <p className="text-sm text-gray-500">Date: {reportDate}</p>
                     </div>
                 </div>

                 {/* Patient / Doctor Details */}
                 <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                     <div>
                         <p className="font-bold text-gray-400 uppercase text-xs">Patient Details</p>
                         <p className="font-bold text-lg">Anonymized Sample</p>
                         <p>Ref: #IMG-{Math.floor(Math.random() * 10000)}</p>
                     </div>
                     <div>
                         <p className="font-bold text-gray-400 uppercase text-xs">Pathologist</p>
                         <p className="font-bold text-lg">Dr. {user?.name || 'Authorized User'}</p>
                         <p>License: #MX-AI-9920</p>
                     </div>
                 </div>

                 {/* Key Findings Box */}
                 <div className="border border-dark/20 rounded-xl overflow-hidden mb-8">
                     <div className="bg-gray-50 px-6 py-4 border-b border-dark/20">
                         <h3 className="font-bold text-lg">Microscopic Findings</h3>
                     </div>
                     <div className="grid grid-cols-2">
                         <div className="p-6 border-r border-dark/20 flex flex-col justify-center items-center">
                             <img 
                                 src={imageUrl} 
                                 alt="Pathology Slide" 
                                 className="max-h-64 object-contain rounded-lg border border-gray-200"
                             />
                             <p className="mt-2 text-xs text-center text-gray-400">Figure 1: Uploaded Specimen (H&E Stain)</p>
                         </div>
                         <div className="p-6">
                             <div className="mb-6">
                                 <p className="text-xs font-bold text-gray-400 uppercase">Primary Diagnosis</p>
                                 <p className="text-2xl font-black text-dark">{result.predictedClassName}</p>
                             </div>
                             
                             <div className="mb-6">
                                 <p className="text-xs font-bold text-gray-400 uppercase">Classification</p>
                                 <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 ${
                                      result.category === 'Malignant' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                 }`}>
                                     {result.category} ({result.confidence.toFixed(2)}% Confidence)
                                 </div>
                             </div>

                             <div>
                                 <p className="text-xs font-bold text-gray-400 uppercase">Analysis Engine</p>
                                 <p className="text-sm font-mono mt-1">MicroX-Net v2.0 (TensorFlow)</p>
                                 <p className="text-sm font-mono">Inference Time: {(result.processingTime || 0).toFixed(3)}s</p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Digital Signature / Footer */}
                 <div className="mt-20 pt-8 border-t border-gray-200 flex justify-between items-end">
                     <div className="text-xs text-gray-400 max-w-md">
                         <p className="font-bold mb-1">Disclaimer:</p>
                         This report is generated by an AI diagnostic support system. It is intended for investigational use only and must be verified by a board-certified pathologist before clinical action.
                     </div>
                     <div className="text-center">
                         <div className="h-12 mb-2">
                             {/* Signature placeholder */}
                             <div className="font-display font-black text-2xl text-dark/20 italic">
                                 MicroX Verified
                             </div>
                         </div>
                         <div className="w-48 h-px bg-dark mb-2"></div>
                         <p className="text-xs font-bold text-dark uppercase tracking-wider">Authorized Signature</p>
                     </div>
                 </div>
            </div>
            {/* End Print Layout */}
        </div>
    );
};

export default AnalysisResult;
