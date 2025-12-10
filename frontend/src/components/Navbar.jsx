import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // Simple check for auth token (in a real app, use Context)
  const user = localStorage.getItem('user');
  
  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
  };

  // Link style
  const linkClass = "text-dark hover:text-gray-600 font-medium transition-colors text-sm uppercase tracking-wide";

  return (
    <nav className="fixed w-full z-50 py-6 bg-cream/90 backdrop-blur-md border-b border-dark/5 print:hidden">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-display font-black text-dark tracking-tighter">
                MicroX<span className="text-yellow-500">.</span>AI
            </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className={linkClass}>Home</Link>
          {user ? (
             <Link to="/dashboard" className={linkClass}>Dashboard</Link>
          ) : (
             <Link to="/analyzer" className={linkClass}>Analyzer</Link>
          )}
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/contact" className={linkClass}>Contact</Link>
        </div>

        {/* CTA / Login / User Profile */}
        <div className="hidden md:flex items-center gap-4">
             {user ? (
                 <div className="flex items-center gap-4">
                     <span className="text-sm font-bold text-dark hidden lg:block">Hello, {JSON.parse(user).name}</span>
                     <button onClick={handleLogout} className="px-6 py-2 border-2 border-dark text-dark rounded-full font-bold hover:bg-dark hover:text-white transition-all text-sm">
                        Logout
                     </button>
                 </div>
             ) : (
                <Link to="/login" className="px-8 py-3 bg-dark text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 text-sm">
                    Login
                </Link>
             )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-t border-dark/5 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
           <Link to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</Link>
           {user ? (
               <>
                   <Link to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>Dashboard</Link>
                   <button onClick={() => { handleLogout(); setIsOpen(false); }} className="px-6 py-3 border-2 border-dark text-dark rounded-full font-bold text-center mt-2">Logout</button>
               </>
           ) : (
               <>
                   <Link to="/analyzer" className={linkClass} onClick={() => setIsOpen(false)}>Analyzer</Link>
                   <Link to="/login" className="px-6 py-3 bg-dark text-white rounded-full text-center font-bold mt-2" onClick={() => setIsOpen(false)}>Login</Link>
               </>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
