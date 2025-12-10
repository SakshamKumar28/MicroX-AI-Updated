import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImageViewer from "../components/ImageViewer";
import ResultPanel from "../components/ResultPanel";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useResult } from "../context/ResultContext";
import { api } from "../services/api";
import Loader from "../components/Loader";

const ResultPage = () => {
  const navigate = useNavigate();
  const { currentResult, currentSlideId } = useResult();
  const [slide, setSlide] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImage = "/vite.svg"; // fallback image in public folder

  useEffect(() => {
    if (!currentResult || !currentSlideId) {
      navigate("/dashboard");
      return;
    }

    loadSlide();
  }, [currentResult, currentSlideId, navigate]);

  const loadSlide = async () => {
    try {
      if (currentSlideId) {
        const slideData = await api.getSlideById(currentSlideId);
        console.log("Loaded slide in ResultPage:", slideData);
        setSlide(slideData);
      }
    } catch (err) {
      console.error("Failed to load slide", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Loader message="Loading results..." />
        </div>
      </div>
    );
  }

  if (!currentResult || !slide) return null;

  // Use slide thumbnail directly to prevent blinking
  let imageUrl = slide.thumbnail;
  // Fallback if thumbnail is missing or invalid
  if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
    imageUrl = fallbackImage;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
          <p className="text-muted-foreground">
            Slide: {slide.name} • Patient: {slide.patientId}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ImageViewer 
              imageUrl={imageUrl} 
              showOverlay={true}
              regions={currentResult.regions || []}
              category={currentResult.category}
            />
          </div>

          <div className="lg:col-span-1">
            <ResultPanel result={currentResult} slideName={slide.name} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
