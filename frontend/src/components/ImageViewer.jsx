import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import Toolbar from './Toolbar';

const ImageViewer = ({ imageUrl, showOverlay = false, regions = [], category }) => {
  const viewerRef = useRef(null);
  const osdRef = useRef(null);
  const overlayRef = useRef(null);

  // Initialize OpenSeadragon once
  useEffect(() => {
    if (!viewerRef.current || osdRef.current) return;

    const viewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
      tileSources: {
        type: 'image',
        url: imageUrl,
      },
      showNavigationControl: false,
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 0.8,
      visibilityRatio: 1,
      zoomPerScroll: 1.2,
    });

    osdRef.current = viewer;

    return () => {
      viewer.destroy();
      osdRef.current = null;
    };
  }, [imageUrl]);

  // Handle overlay dynamically
  useEffect(() => {
    const viewer = osdRef.current;
    if (!viewer) return;

    // Remove existing overlays
    if (overlayRef.current) {
      overlayRef.current.forEach(overlay => viewer.removeOverlay(overlay));
      overlayRef.current = null;
    }

    // Add overlays if requested
    if (showOverlay && regions.length > 0) {
      overlayRef.current = regions.map(region => {
        const overlay = document.createElement('div');
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.border = `3px solid ${region.color}`;
        overlay.style.backgroundColor = `${region.color}33`; // 20% opacity
        overlay.style.borderRadius = '8px';
        overlay.style.pointerEvents = 'none';
        
        // Add confidence indicator
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.top = '8px';
        label.style.left = '8px';
        label.style.padding = '4px 8px';
        label.style.backgroundColor = region.color;
        label.style.color = 'white';
        label.style.borderRadius = '4px';
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.textContent = `${Math.round(region.confidence)}% Confidence`;
        overlay.appendChild(label);

        viewer.addOverlay({
          element: overlay,
          location: new OpenSeadragon.Rect(0.1, 0.1, 0.8, 0.8),
        });

        return overlay;
      });
    }
  }, [showOverlay, regions]);

  const handleZoomIn = () => {
    const viewer = osdRef.current;
    if (viewer) {
      viewer.viewport.zoomBy(1.3);
      viewer.viewport.applyConstraints();
    }
  };

  const handleZoomOut = () => {
    const viewer = osdRef.current;
    if (viewer) {
      viewer.viewport.zoomBy(1 / 1.3);
      viewer.viewport.applyConstraints();
    }
  };

  const handleReset = () => osdRef.current?.viewport.goHome();
  const handleFullscreen = () => osdRef.current?.setFullScreen(true);

  return (
    <div className="relative h-full w-full">
      <div
        ref={viewerRef}
        className="h-full w-full rounded-lg border bg-muted"
        style={{ minHeight: '500px' }}
      />
      <div className="absolute bottom-4 left-4 z-10">
        <Toolbar
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onFullscreen={handleFullscreen}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
