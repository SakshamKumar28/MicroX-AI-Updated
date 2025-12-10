import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-32 pb-20 bg-cream min-h-screen font-body">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Contact Info */}
                    <div>
                        <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm mb-4 block">Get in Touch</span>
                        <h1 className="text-5xl md:text-6xl font-display font-black text-dark mb-8">Let's start a conversation.</h1>
                        <p className="text-xl text-gray-600 mb-12">
                            Have questions about our technology or enterprise pricing? Our team is ready to assist you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl border border-dark/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Mail className="text-dark" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-dark">Email Us</h3>
                                    <p className="text-gray-500">contact@microx-ai.com</p>
                                    <p className="text-gray-500">support@microx-ai.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl border border-dark/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <MapPin className="text-dark" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-dark">Visit HQ</h3>
                                    <p className="text-gray-500">123 Innovation Drive</p>
                                    <p className="text-gray-500">Tech City, NY 10001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-white rounded-2xl border border-dark/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Phone className="text-dark" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-dark">Call Us</h3>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                    <p className="text-xs text-gray-400 mt-1">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-display font-bold text-dark mb-8">Send us a message</h3>
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h4 className="text-2xl font-bold text-dark mb-2">Message Sent!</h4>
                                <p className="text-gray-500">We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">FullName</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-2">Message</label>
                                    <textarea 
                                        required
                                        rows="4"
                                        className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full py-5 bg-dark text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                    <Send size={20} /> Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
