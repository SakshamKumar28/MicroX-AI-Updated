import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { signupUser } from '../services/api';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            await signupUser(name, email, password);
            navigate('/login'); // Redirect to login after success
        } catch (err) {
            setError(err.detail || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream p-6">
             <div className="bg-white rounded-[3rem] p-10 max-w-md w-full border-2 border-dark shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
                  <Link to="/" className="flex items-center gap-2 text-dark font-bold hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Home
                 </Link>
                 
                 <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-light rounded-2xl border border-dark flex items-center justify-center mx-auto mb-6 text-dark shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                        <Leaf size={32} />
                    </div>
                    <h2 className="text-4xl font-display font-black text-dark">Join MicroX-AI</h2>
                    <p className="text-gray-500 mt-2">Start your medical analysis journey with us</p>
                 </div>

                 {error && (
                     <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                         {error}
                     </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-dark mb-2">Full Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-6 py-4 rounded-xl border-2 border-dark/10 focus:border-dark outline-none transition-all bg-cream"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-6 py-4 rounded-xl border-2 border-dark/10 focus:border-dark outline-none transition-all bg-cream"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-6 py-4 rounded-xl border-2 border-dark/10 focus:border-dark outline-none transition-all bg-cream"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-dark text-white rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                 </form>

                 <p className="text-center mt-8 text-gray-600">
                    Already have an account? {' '}
                    <Link to="/login" className="text-primary font-bold hover:underline">
                        Sign In
                    </Link>
                 </p>
             </div>
        </div>
    );
};

export default Signup;
