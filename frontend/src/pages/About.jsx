import React from 'react';
import { Target, Users, Shield, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 pb-20 bg-cream min-h-screen font-body">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm mb-4 block">Our Mission</span>
                    <h1 className="text-5xl md:text-6xl font-display font-black text-dark mb-6">Democratizing Fast & Accurate Diagnosis.</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        MicroX-AI is on a mission to empower pathologists worldwide with state-of-the-art artificial intelligence, reducing diagnostic errors and saving lives through precision medicine.
                    </p>
                </div>

                {/* Stats / Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-dark mb-3">Precision First</h3>
                        <p className="text-gray-500">We prioritize clinical-grade accuracy above all, ensuring every analysis is reliable.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-dark mb-3">Data Privacy</h3>
                        <p className="text-gray-500">Your patient data is encrypted and secure conformant to HIPAA & GDPR standards.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-dark mb-3">Human Centric</h3>
                        <p className="text-gray-500">AI is a tool to assist, not replace. We design for the human experts in the loop.</p>
                    </div>
                </div>

                {/* Story / Context */}
                <div className="bg-dark text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-display font-bold mb-6">From Research to Reality</h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                Founded by a team of medical researchers and computer scientists, MicroX-AI started as a university project to solve the bottleneck in histology slide analysis. Today, it processes thousands of slides daily.
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                    <div className="font-bold text-3xl text-yellow-500 mb-1">2023</div>
                                    <div className="text-sm text-white/60">Founded</div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                    <div className="font-bold text-3xl text-yellow-500 mb-1">50+</div>
                                    <div className="text-sm text-white/60">Partner Labs</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-yellow-500/20 rounded-3xl"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
                                alt="Lab Team" 
                                className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
