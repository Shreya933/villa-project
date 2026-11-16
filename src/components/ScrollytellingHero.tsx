import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLLYTELLING_CONFIG } from '../config/scrollytelling';
import { FrameLoader } from '../utils/frameLoader';
import { StoryOverlays } from './StoryOverlays';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingHeroProps {
  onScrollToPhaseRef: (fn: (stageIndex: number) => void) => void;
}

export const ScrollytellingHero: React.FC<ScrollytellingHeroProps> = ({ onScrollToPhaseRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loading state
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);

  // Runtime scroll & stage state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  // Preloader instance
  const frameLoader = useMemo(() => new FrameLoader(), []);

  // Animation values
  const playheadRef = useRef<{ current: number; target: number }>({ current: 0, target: 0 });
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // High-performance Canvas Cover Renderer
  const drawCanvasFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const drawable = frameLoader.getFrame(frameIndex);
      if (!drawable) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const targetW = Math.round(viewportW * dpr);
      const targetH = Math.round(viewportH * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Object-fit: cover aspect ratio math (preserving 16:9 natively)
      const srcW = 'width' in drawable ? drawable.width : 1920;
      const srcH = 'height' in drawable ? drawable.height : 1080;
      const imgRatio = srcW / srcH;
      const screenRatio = viewportW / viewportH;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (screenRatio > imgRatio) {
        drawW = viewportW;
        drawH = viewportW / imgRatio;
        drawX = 0;
        drawY = (viewportH - drawH) / 2;
      } else {
        drawH = viewportH;
        drawW = viewportH * imgRatio;
        drawX = (viewportW - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(drawable, drawX, drawY, drawW, drawH);
      ctx.restore();

      lastDrawnFrameRef.current = frameIndex;
    },
    [frameLoader]
  );

  // 1. Initialize Frame Loading
  useEffect(() => {
    frameLoader.onProgress((percent) => {
      setLoadingProgress(percent);
    });

    frameLoader.onInitialReady(() => {
      setIsInteractive(true);
      // Immediately draw frame 0 so visitor sees construction site instantly
      drawCanvasFrame(0);
    });

    frameLoader.startLoading();

    return () => {
      frameLoader.destroy();
    };
  }, [frameLoader, drawCanvasFrame]);

  // 2. 60fps Animation Loop with Easing / Lerp
  useEffect(() => {
    const animate = () => {
      const playhead = playheadRef.current;
      const diff = playhead.target - playhead.current;

      // Inertial easing (scrub ~0.5 feel)
      if (Math.abs(diff) > 0.001) {
        playhead.current += diff * SCROLLYTELLING_CONFIG.scrubDamping;
      } else {
        playhead.current = playhead.target;
      }

      const activeIndex = Math.min(
        SCROLLYTELLING_CONFIG.frameCount - 1,
        Math.max(0, Math.round(playhead.current))
      );

      // Redraw only when frame index changes (targeting 60fps efficiency)
      if (activeIndex !== lastDrawnFrameRef.current) {
        drawCanvasFrame(activeIndex);
        setCurrentFrameIndex(activeIndex);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Responsive resize handler
    const handleResize = () => {
      drawCanvasFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawCanvasFrame]);

  // 3. GSAP ScrollTrigger Integration
  useEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewport,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          playheadRef.current.target = progress * (SCROLLYTELLING_CONFIG.frameCount - 1);
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  // Jump to specific scroll progress
  const handleJumpToProgress = useCallback((targetProgress: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScroll = container.scrollHeight - window.innerHeight;
    const targetY = container.offsetTop + targetProgress * totalScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  // Expose jump-to-phase to parent Navbar
  useEffect(() => {
    onScrollToPhaseRef((stageIndex: number) => {
      const stage = SCROLLYTELLING_CONFIG.stages[stageIndex];
      if (stage) {
        handleJumpToProgress((stage.startProgress + stage.endProgress) / 2);
      }
    });
  }, [handleJumpToProgress, onScrollToPhaseRef]);

  // Determine active stage
  const activeStage = useMemo(() => {
    for (const stage of SCROLLYTELLING_CONFIG.stages) {
      if (scrollProgress >= stage.startProgress && scrollProgress <= stage.endProgress) {
        return stage;
      }
    }
    return SCROLLYTELLING_CONFIG.stages[0];
  }, [scrollProgress]);

  return (
    <div
      className="scrolly-container"
      ref={containerRef}
      style={{ height: SCROLLYTELLING_CONFIG.scrollHeight }}
    >
      {/* Sticky / Pinned Full-Screen Canvas Viewport */}
      <div className="scrolly-pinned-viewport" ref={viewportRef}>
        {/* The single full-viewport HTML Canvas */}
        <canvas className="scrolly-canvas" ref={canvasRef} />

        {/* Cinematic Vignette Overlay for Text Legibility */}
        <div className="scrolly-vignette" />

        {/* Layered Storytelling Overlays */}
        <StoryOverlays
          scrollProgress={scrollProgress}
          currentFrameIndex={currentFrameIndex}
          activeStage={activeStage}
          onJumpToProgress={handleJumpToProgress}
        />

        {/* Initial Loading Screen with Progress Percentage */}
        <div className={`scrolly-preloader ${isInteractive ? 'ready' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-brand">FORM / ARCHITECTURE</div>
            <div className="preloader-status">PREPARING 1,200 ARCHITECTURAL FRAMES</div>

            <div className="preloader-progress-track">
              <div
                className="preloader-progress-fill"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="preloader-meta">
              <span>INITIALIZING SEQUENTIAL RENDER</span>
              <span className="preloader-number">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
