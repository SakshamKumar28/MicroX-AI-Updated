import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Microscope } from 'lucide-react';
import heroImage from '../assets/hero-bg.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2">
            <Microscope className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">AI-Powered Digital Pathology</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-gray-800">
            Advanced{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Analysis
            </span>{' '}
            for Digital Pathology
          </h1>

          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Upload high-resolution tissue slides and receive instant AI-powered analysis with precision overlays and confidence scores.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="group shadow-md bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Try Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/signup')} className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
