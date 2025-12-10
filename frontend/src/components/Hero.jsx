import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import heroBg from '../assets/hero-bg.png'; // Using consistent asset

import { useState } from 'react';

const Hero = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRequestAccess = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };
    return (
        <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-cream">
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Content */}
                <div className="relative z-10 order-2 lg:order-1">
                     <div className="inline-block px-4 py-2 bg-yellow-light rounded-full mb-6 border border-dark/5">
                        <span className="text-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                             <Star size={14} className="fill-yellow-500 text-yellow-500" /> 
                             AI-Powered Pathology
                        </span>
                     </div>
                     
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] text-dark mb-8 tracking-tight">
                        Precision <br/>
                        <span className="relative inline-block">
                             Diagnostics
                             <svg className="absolute w-full h-4 -bottom-1 left-0 text-yellow-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                             </svg>
                        </span>
                    </h1>

                    <p className="text-gray-600 text-xl md:text-2xl leading-relaxed mb-10 max-w-lg">
                        Automated detection of pathological patterns with 99.8% accuracy.
                    </p>

                    <form onSubmit={handleRequestAccess} className="flex flex-col sm:flex-row gap-4 max-w-md">
                         <div className="relative flex-grow w-full">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your work email" 
                                className="w-full px-8 py-5 bg-white rounded-full border border-dark/10 outline-none focus:border-dark transition-colors shadow-sm text-dark placeholder:text-gray-400"
                                required
                            />
                            <button 
                                type="submit"
                                className="w-full mt-4 md:mt-0 md:absolute md:right-2 md:top-2 md:bottom-2 px-8 py-4 md:py-0 bg-dark text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg md:shadow-none"
                            >
                                {isSubmitted ? "Request Sent!" : "Request Access"}
                            </button>
                         </div>
                    </form>
                    
                    <div className="mt-12 flex items-center gap-8">
                        <div>
                            <p className="text-3xl font-black text-dark">12k+</p>
                            <p className="text-gray-500 text-sm font-medium">Slides Analyzed</p>
                        </div>
                        <div className="w-px h-10 bg-dark/10"></div>
                        <div>
                            <p className="text-3xl font-black text-dark">99%</p>
                            <p className="text-gray-500 text-sm font-medium">Confidence</p>
                        </div>
                        <div className="w-px h-10 bg-dark/10"></div>
                        <div>
                            <p className="text-3xl font-black text-dark">&lt;2s</p>
                            <p className="text-gray-500 text-sm font-medium">Inference Time</p>
                        </div>
                    </div>
                </div>

                {/* Right Image with Blob Shape */}
                <div className="relative order-1 lg:order-2">
                    <div className="relative z-10">
                        {/* Abstract Blob Background */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-yellow-300 -z-10 opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-4.9C93.5,9.5,82.1,23.1,70.9,34.8C59.7,46.5,48.7,56.2,36.4,63.5C24.1,70.8,10.5,75.7,-2.3,79.7C-15.1,83.7,-27.1,86.8,-37.8,82.6C-48.4,78.4,-57.8,67,-66.3,55.1C-74.8,43.2,-82.5,30.8,-83.4,18.1C-84.3,5.4,-78.4,-7.6,-70.6,-18.7C-62.8,-29.7,-53.1,-38.8,-42.6,-47.2C-32.1,-55.6,-20.8,-63.4,-8.8,-68.9C3.2,-74.5,16,-77.8,28.8,-81.1L44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>

                        {/* Image Mask */}
                        <div className="rounded-[4rem] overflow-hidden border-4 border-dark shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                            <img 
                                src={heroBg} 
                                alt="Microscope" 
                                className="w-full h-[600px] object-cover"
                            />
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-dark/5 flex items-center gap-3 animate-bounce-slow">
                             <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">A+</div>
                             <div>
                                 <p className="font-bold text-dark">Clinical Grade</p>
                                 <p className="text-xs text-gray-500">Validation</p>
                             </div>
                        </div>

                         <div className="absolute bottom-20 -right-5 bg-yellow-light p-4 rounded-2xl shadow-xl border border-dark/5 flex items-center gap-3 animate-pulse">
                             <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-dark font-bold text-lg">★</div>
                             <div>
                                 <p className="font-bold text-dark">Top Accuracy</p>
                                 <p className="text-xs text-dark/70">Verified Results</p>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

export default Hero;
