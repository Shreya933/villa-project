import React, { useEffect, useRef, useState } from 'react';
import { TopNav, PageId } from './components/TopNav';
import { ResidencesView } from './components/ResidencesView';
import { AboutUsView } from './components/AboutUsView';

const TOTAL_FRAMES = 1200;

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('experience');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // In-memory cache for all 1200 frames
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const playheadRef = useRef<{ current: number; target: number }>({ current: 0, target: 0 });
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // High-performance canvas drawing with manual cover aspect-ratio scaling
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retrieve target image or nearest loaded fallback
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = frameIndex - offset;
        const next = frameIndex + offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]!.naturalWidth > 0) {
          img = imagesRef.current[prev];
          break;
        }
        if (next < TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next]!.naturalWidth > 0) {
          img = imagesRef.current[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

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

    // Cover scaling math (maintains 16:9 1920x1080 native proportions)
    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;
    const imgRatio = imgW / imgH;
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

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    lastDrawnFrameRef.current = frameIndex;
  };

  // 1. Instant loading: Load frame 1 immediately, then preload all 1200 frames
  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = '/frames/frame_00001.webp';
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      if (activePage === 'experience') {
        drawFrame(0);
      }
    };

    let isCancelled = false;

    const preloadBatch = (start: number, batchSize: number) => {
      if (isCancelled || start >= TOTAL_FRAMES) return;

      const end = Math.min(start + batchSize, TOTAL_FRAMES);
      for (let i = start; i < end; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          const frameNum = String(i + 1).padStart(5, '0');
          img.src = `/frames/frame_${frameNum}.webp`;
          img.onload = () => {
            imagesRef.current[i] = img;
          };
        }
      }

      setTimeout(() => {
        preloadBatch(end, batchSize);
      }, 30);
    };

    preloadBatch(1, 60);

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Scroll Animation Loop when activePage === 'experience'
  useEffect(() => {
    if (activePage !== 'experience') return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      playheadRef.current.target = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      const playhead = playheadRef.current;
      const diff = playhead.target - playhead.current;

      // Smooth inertia
      if (Math.abs(diff) > 0.001) {
        playhead.current += diff * 0.15;
      } else {
        playhead.current = playhead.target;
      }

      const activeIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(playhead.current))
      );

      if (activeIndex !== lastDrawnFrameRef.current) {
        drawFrame(activeIndex);
      }

      // Smoothly fade in the 2-line quote at the end of the video (progress > 88%)
      if (quoteRef.current) {
        const progress = playhead.current / (TOTAL_FRAMES - 1);
        if (progress > 0.88) {
          const quoteOpacity = Math.min(1, Math.max(0, (progress - 0.88) / 0.09));
          const translateY = (1 - quoteOpacity) * 20;
          quoteRef.current.style.opacity = quoteOpacity.toString();
          quoteRef.current.style.transform = `translateX(-50%) translateY(${translateY}px)`;
        } else {
          quoteRef.current.style.opacity = '0';
          quoteRef.current.style.transform = 'translateX(-50%) translateY(20px)';
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      drawFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [activePage]);

  // When switching pages, scroll window to top
  const handlePageSwitch = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (page === 'experience') {
      setTimeout(() => {
        drawFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
      }, 50);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Minimal Luxury Navigation */}
      <TopNav activePage={activePage} onSelectPage={handlePageSwitch} />

      {/* Page 1: The Experience (Existing working scroll video + quote) */}
      <div
        className="experience-page-container"
        style={{ display: activePage === 'experience' ? 'block' : 'none' }}
      >
        <div className="scroll-container" ref={containerRef}>
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="hero-canvas" />

            <div className="end-quote-overlay" ref={quoteRef}>
              <p className="quote-line-primary">
                "Every great structure begins with a vision on raw earth."
              </p>
              <p className="quote-line-secondary">
                Crafted with precision, built to endure for generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2: Residences (Portfolio) */}
      {activePage === 'residences' && <ResidencesView />}

      {/* Page 3: About Us (from zip) */}
      {activePage === 'about' && <AboutUsView />}
    </div>
  );
};

export default App;
