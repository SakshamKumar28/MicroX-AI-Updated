import { Button } from '../components/ui/button';
import { ZoomIn, ZoomOut, Maximize, Home } from 'lucide-react';

const Toolbar = ({ onZoomIn, onZoomOut, onReset, onFullscreen }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-card p-2 shadow-medical">
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomIn}
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomOut}
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onReset}
        title="Reset View"
      >
        <Home className="h-5 w-5" />
      </Button>
      <div className="mx-2 h-6 w-px bg-border" />
      <Button
        size="icon"
        variant="ghost"
        onClick={onFullscreen}
        title="Fullscreen"
      >
        <Maximize className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Toolbar;
