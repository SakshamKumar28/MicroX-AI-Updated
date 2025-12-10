import { useState } from 'react';
import { Activity, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Activity className="absolute -top-10 -left-10 w-96 h-96" />
          <Activity className="absolute top-20 right-0 w-64 h-64 rotate-45" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter / CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 rounded-3xl p-10 mb-16 backdrop-blur-sm border border-white/10">
            <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl font-display font-bold mb-2">Stay Updated</h3>
                <p className="text-white/70 max-w-md">Subscribe to our newsletter for the latest in medical AI advancements.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row w-full md:w-auto bg-white/10 md:bg-white rounded-[2rem] p-2 md:p-1 md:pl-6 gap-2">
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="bg-white md:bg-transparent px-6 py-4 md:py-0 rounded-full md:rounded-none flex-grow outline-none text-dark placeholder:text-gray-400 min-w-[200px]"
                    required
                />
                <button type="submit" className="bg-dark text-white px-8 py-3 rounded-full hover:bg-primary transition-colors font-medium shadow-lg md:shadow-none whitespace-nowrap">
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                </button>
            </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-white p-1 rounded-full">
                        <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xl font-display font-bold">MicroX-AI</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                    Revolutionizing pathology with precision AI diagnostics. Empowering healthcare with speed and accuracy.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-dark transition-all"><Twitter size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-dark transition-all"><Linkedin size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-dark transition-all"><Instagram size={18} /></a>
                </div>
            </div>
            
            <div>
                <h4 className="font-bold mb-6 text-lg">Platform</h4>
                <ul className="space-y-3 text-white/70">
                    <li><a href="/analyzer" className="hover:text-secondary transition-colors">AI Analyzer</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Technology</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Research</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Case Studies</a></li>
                </ul>
            </div>
            
            <div>
                <h4 className="font-bold mb-6 text-lg">Company</h4>
                <ul className="space-y-3 text-white/70">
                    <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
                </ul>
            </div>

            <div>
                 <h4 className="font-bold mb-6 text-lg">Contact</h4>
                 <ul className="space-y-4 text-white/70">
                    <li className="flex items-start gap-3">
                        <MapPin size={18} className="mt-1 shrink-0" />
                        <span>123 Innovation Dr,<br/>Tech City, NY 10001</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Mail size={18} className="shrink-0" />
                        <span>contact@microx-ai.com</span>
                    </li>
                    <li className="flex items-center gap-3">
                         <Phone size={18} className="shrink-0" />
                        <span>+1 (555) 123-4567</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="pt-8 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 MicroX-AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
