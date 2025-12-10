import React from 'react';
import { ArrowRight, Activity, Shield, Zap, Microscope, FileText, Share2, Layers, Star } from 'lucide-react';
import Hero from '../components/Hero';

// Assets
import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';
import overlay from '../assets/overlay_heatmap.png';

const Home = () => {
    
    // Category Pills (Reference: "Academic", "Technical")
    const categories = [
        { id: 1, name: "Tumor Detection", color: "bg-[#E0B0FF]", icon: Activity },
        { id: 2, name: "Cell Counting", color: "bg-[#A5C8FF]", icon: Layers },
        { id: 3, name: "Histology", color: "bg-[#FFB7B2]", icon: Microscope },
        { id: 4, name: "Reporting", color: "bg-[#FFF4C3]", icon: FileText },
    ];

    // Card Data (Reference: "Popular Courses")
    const features = [
        {
            id: 1,
            tag: "BEST SELLER",
            title: "Breast Cancer Segmentation",
            desc: "Automated identification of malignant tissues in WSI.",
            image: sample1,
            price: "High Precision"
        },
        {
            id: 2,
            tag: "NEW",
            title: "Cell Morphology",
            desc: "Detailed shape and size analysis of individual cells.",
            image: sample2,
            price: "Advanced"
        },
        {
            id: 3,
            tag: "FAST",
            title: "Rapid Diagnostics",
            desc: "Full slide analysis in under 5 seconds.",
            image: overlay,
            price: "Real-time"
        }
    ];

    return (
        <div className="bg-cream font-body">
            <Hero />
            
            {/* Categories Section */}
            <section className="py-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-4">Core Capabilities</h2>
                    <p className="text-gray-500">Everything you need for advanced digital pathology.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className={`${cat.color} p-6 rounded-3xl border-2 border-dark shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group`}>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-dark group-hover:scale-110 transition-transform">
                                <cat.icon className="text-dark" size={20} />
                            </div>
                            <h3 className="font-bold text-dark text-lg">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

             {/* Popular Features (Cards) */}
             {/* Testimonials / Stats - Large Dark Section */}
             <section className="py-24 container mx-auto px-6">
                <div className="bg-yellow-light rounded-[3rem] p-8 md:p-20 relative overflow-hidden border-2 border-dark">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                         <Star size={200} className="text-dark" />
                    </div>
                    
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-black text-dark mb-8">
                            "Revolutionizing how we diagnose."
                        </h2>
                        <p className="text-xl text-dark/70 mb-12 font-medium">
                            MicroX-AI has reduced our turnaround time by 60% while maintaining clinical-grade accuracy. It's the assistant every pathologist needs.
                        </p>
                        
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full border-2 border-dark overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-dark text-lg">Dr. Sarah Jensen</p>
                                <p className="text-sm text-dark/60">Chief Pathologist, NY Med</p>
                            </div>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default Home;
