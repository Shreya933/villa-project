import React from 'react';
import { SCROLLYTELLING_CONFIG, ConstructionStage } from '../config/scrollytelling';

interface StoryOverlaysProps {
  scrollProgress: number;
  currentFrameIndex: number;
  activeStage: ConstructionStage | null;
  onJumpToProgress: (progress: number) => void;
}

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  scrollProgress,
  currentFrameIndex,
  activeStage,
  onJumpToProgress
}) => {
  // Hero section opacity: fades out between 0% and 6% scroll
  const heroOpacity = Math.max(0, 1 - scrollProgress * 16);
  const heroTranslateY = scrollProgress * -40;

  return (
    <div className="story-overlays-container">
      {/* 1. Master Top Scroll Progress Bar */}
      <div className="master-progress-track">
        <div
          className="master-progress-fill"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* 2. Hero Overlay (Visible at scroll start) */}
      <div
        className="hero-story-overlay"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          pointerEvents: heroOpacity > 0.05 ? 'auto' : 'none'
        }}
      >
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">PROJECT 001</span>
          <span>PRIVATE COMMISSION</span>
        </div>

        <h1 className="hero-title">
          <span>FROM VISION</span>
          <span className="hero-title-italic">TO REALITY.</span>
        </h1>

        <p className="hero-description">
          Witness the realization of a bespoke modern sanctuary. Control 1,200 continuous frames
          of architectural engineering from bare earth to turnkey luxury.
        </p>

        <div className="hero-scroll-indicator">
          <span className="scroll-hint-text">SCROLL TO CONSTRUCT</span>
          <div className="scroll-indicator-line">
            <div className="scroll-indicator-pulse" />
          </div>
        </div>
      </div>

      {/* 3. Stage-Synced Floating Story Cards */}
      {SCROLLYTELLING_CONFIG.stages.map((stage, idx) => {
        // Calculate stage opacity based on scroll progress window
        const { startProgress, endProgress } = stage;
        const range = endProgress - startProgress;
        const fadePadding = range * 0.2; // 20% fade-in and fade-out zones

        let opacity = 0;
        let translateY = 30;

        if (scrollProgress >= startProgress && scrollProgress <= endProgress) {
          if (scrollProgress < startProgress + fadePadding) {
            // Fading in
            const t = (scrollProgress - startProgress) / fadePadding;
            opacity = Math.min(1, Math.max(0, t));
            translateY = 30 * (1 - opacity);
          } else if (scrollProgress > endProgress - fadePadding) {
            // Fading out
            const t = (endProgress - scrollProgress) / fadePadding;
            opacity = Math.min(1, Math.max(0, t));
            translateY = -20 * (1 - opacity);
          } else {
            // Peak visibility
            opacity = 1;
            translateY = 0;
          }
        }

        if (opacity <= 0.01) return null;

        // Alternate cards between left and right layout for editorial visual rhythm
        const isRightAligned = idx % 2 === 1;

        return (
          <div
            key={stage.id}
            className={`stage-card-wrapper ${isRightAligned ? 'align-right' : 'align-left'}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`
            }}
          >
            <div className="stage-glass-card">
              <div className="stage-header">
                <span className="stage-phase-tag">PHASE {stage.phaseNumber}</span>
                <span className="stage-label-tag">{stage.phaseLabel}</span>
              </div>

              <h2 className="stage-card-title">{stage.title}</h2>
              <div className="stage-card-subtitle">{stage.subtitle}</div>

              <p className="stage-card-description">{stage.description}</p>

              {stage.metrics && (
                <div className="stage-metrics-row">
                  {stage.metrics.map((m) => (
                    <div key={m.label} className="metric-pill">
                      <span className="metric-value">{m.value}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 4. Luxury Floating HUD & Interactive Milestone Pill Selector (Bottom-Right) */}
      <aside className="architectural-timeline-hud">
        <div className="hud-header">
          <div className="hud-phase-meta">
            <span className="hud-phase-badge">
              PHASE {activeStage ? activeStage.phaseNumber : '01'} / 05
            </span>
            <span className="hud-frame-counter">
              FRAME {String(currentFrameIndex + 1).padStart(4, '0')} / 1200
            </span>
          </div>
          <span className="hud-progress-percentage">{Math.round(scrollProgress * 100)}%</span>
        </div>

        <div className="hud-title">{activeStage ? activeStage.title : 'Site & Groundwork'}</div>

        {/* 5 Milestone Jump Buttons */}
        <div className="hud-milestone-track">
          {SCROLLYTELLING_CONFIG.stages.map((stg, i) => {
            const isActive = scrollProgress >= stg.startProgress;
            const isCurrent = activeStage?.id === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                className={`hud-milestone-node ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                title={`Jump to Phase ${stg.phaseNumber}: ${stg.title}`}
                onClick={() => onJumpToProgress((stg.startProgress + stg.endProgress) / 2)}
              >
                <span className="node-bar" />
                <span className="node-label">0{i + 1}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
