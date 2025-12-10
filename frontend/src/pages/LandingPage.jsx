import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import { Brain, Zap, Shield, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Deep learning models trained on thousands of pathology samples for precise diagnoses.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive analysis results in seconds with confidence scores and annotations.',
    },
    {
      icon: Shield,
      title: 'Clinical Grade',
      description: 'HIPAA-compliant platform ensuring enterprise-grade security for patient data.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Insights',
      description: 'Interactive visualizations with heatmap overlays and region-specific analysis.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  MicroX AI
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transform your diagnostic workflow with cutting-edge AI technology for medical professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-default">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#e0e7ff]">
          <div className="container mx-auto px-4 text-center  p-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of medical professionals using MicroX AI for faster, more accurate diagnoses.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
