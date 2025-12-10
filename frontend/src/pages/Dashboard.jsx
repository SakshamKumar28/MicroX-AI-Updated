import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImages } from '../services/api';
import { FileText, Clock, ArrowRight, Plus } from 'lucide-react';

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getImages();
                setReports(data);
            } catch (err) {
                console.error("Failed to fetch reports", err);
                setError("Failed to load your history.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchReports();
        } else {
            setLoading(false);
        }
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-light pt-32 pb-12 flex justify-center">
                 <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light pt-28 pb-12">
            <div className="container mx-auto px-6 max-w-6xl">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-2">
                             Hello, {user?.name || 'Pathologist'}
                        </h1>
                        <p className="text-gray-500 text-lg">Here is your analysis overview.</p>
                    </div>
                    <Link to="/analyzer" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                        <Plus size={20} /> New Analysis
                    </Link>
                </div>

                {/* Stats / Overview (Mock Data for Visuals) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                         <div className="text-4xl font-black text-dark mb-1">{reports.length}</div>
                         <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Reports</div>
                     </div>
                     <div className="bg-yellow-light p-8 rounded-[2rem] shadow-sm border border-yellow-200">
                         <div className="text-4xl font-black text-dark mb-1">
                             {reports.filter(r => r.analysis?.category === 'Malignant').length}
                         </div>
                         <div className="text-dark/60 text-sm font-bold uppercase tracking-wider">Cases Flagged</div>
                     </div>
                     <div className="bg-dark p-8 rounded-[2rem] shadow-sm text-white">
                         <div className="text-4xl font-black mb-1">99.8%</div>
                         <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Avg. Confidence</div>
                     </div>
                </div>

                {/* Reports Grid */}
                <div>
                    <h2 className="text-2xl font-display font-bold text-dark mb-6 flex items-center gap-2">
                        <Clock size={24} className="text-gray-400" /> Recent Activity
                    </h2>

                    {reports.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-2">No reports yet</h3>
                            <p className="text-gray-500 mb-8">Upload your first slide to generate a diagnosis.</p>
                             <Link to="/analyzer" className="px-6 py-3 bg-dark text-white rounded-full font-bold hover:bg-gray-800 transition-all inline-flex items-center gap-2">
                                Start Analysis
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {reports.map((report) => (
                                <Link 
                                    to={`/analysis/${report.id || report._id}`} 
                                    state={{ result: report.analysis, imageUrl: report.url }}
                                    key={report.id || report._id}
                                    className="bg-white p-6 rounded-[2rem] shadow-md hover:shadow-xl transition-all border border-gray-100 group flex flex-col sm:flex-row gap-6 items-center"
                                >
                                    <div className="w-full sm:w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                        <img src={report.url} alt="Slide" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-grow">
                                         <div className="flex justify-between items-start mb-2">
                                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                  report.analysis?.category === 'Malignant' 
                                                  ? 'bg-red-100 text-red-700' 
                                                  : 'bg-green-100 text-green-700'
                                              }`}>
                                                  {report.analysis?.category || "Processed"}
                                              </span>
                                              <span className="text-xs text-gray-400 font-medium">
                                                  {formatDate(report.created_at)}
                                              </span>
                                         </div>
                                         <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-primary transition-colors">
                                             {report.analysis?.predictedClassName || "Unknown Diagnosis"}
                                         </h3>
                                         <div className="flex items-center gap-4 text-sm text-gray-500">
                                             <span>Confidence: {(report.analysis?.confidence || 0).toFixed(1)}%</span>
                                         </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
