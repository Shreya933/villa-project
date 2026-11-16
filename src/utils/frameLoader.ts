import { SCROLLYTELLING_CONFIG } from '../config/scrollytelling';

export type FrameDrawable = HTMLImageElement | ImageBitmap;

export class FrameLoader {
  private cache: (FrameDrawable | null)[] = new Array(SCROLLYTELLING_CONFIG.frameCount).fill(null);
  private loadedSet = new Set<number>();
  private isMobile = false;
  private isDestroyed = false;
  private onProgressCallback?: (percent: number, loadedCount: number) => void;
  private onInitialReadyCallback?: () => void;

  constructor() {
    if (typeof window !== 'undefined') {
      const isNarrow = window.innerWidth < 768;
      const isLowCores = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
      this.isMobile = isNarrow || isLowCores;
    }
  }

  public onProgress(cb: (percent: number, loadedCount: number) => void) {
    this.onProgressCallback = cb;
  }

  public onInitialReady(cb: () => void) {
    this.onInitialReadyCallback = cb;
  }

  public getFrame(index: number): FrameDrawable | null {
    const clamped = Math.max(0, Math.min(SCROLLYTELLING_CONFIG.frameCount - 1, index));
    if (this.cache[clamped]) {
      return this.cache[clamped];
    }

    // Nearest-neighbor fallback: search outward for closest loaded frame
    for (let offset = 1; offset < SCROLLYTELLING_CONFIG.frameCount; offset++) {
      const prev = clamped - offset;
      const next = clamped + offset;
      if (prev >= 0 && this.cache[prev]) return this.cache[prev];
      if (next < SCROLLYTELLING_CONFIG.frameCount && this.cache[next]) return this.cache[next];
    }

    return null;
  }

  public has(index: number): boolean {
    return this.loadedSet.has(index);
  }

  public getLoadedCount(): number {
    return this.loadedSet.size;
  }

  public async startLoading() {
    const total = SCROLLYTELLING_CONFIG.frameCount;
    const initialCount = SCROLLYTELLING_CONFIG.initialPreloadCount;

    // Phase 1: Load initial priority frames (1 to initialCount) so UI is instantly interactive
    const initialBatch: Promise<void>[] = [];
    for (let i = 0; i < initialCount; i++) {
      initialBatch.push(this.loadSingleFrame(i));
    }

    await Promise.allSettled(initialBatch);
    if (this.isDestroyed) return;

    if (this.onInitialReadyCallback) {
      this.onInitialReadyCallback();
    }

    // Phase 2: Load key milestone keyframes across the 5 stages
    const keyFrames = [120, 260, 400, 530, 660, 790, 920, 1030, 1150, 1199];
    const keyBatch: Promise<void>[] = [];
    for (const k of keyFrames) {
      if (!this.cache[k]) {
        keyBatch.push(this.loadSingleFrame(k));
      }
    }
    await Promise.allSettled(keyBatch);
    if (this.isDestroyed) return;

    // Phase 3: Lazily load all remaining frames in progressive batches
    const step = this.isMobile ? 2 : 1;
    const batchSize = SCROLLYTELLING_CONFIG.lazyBatchSize;

    for (let i = initialCount; i < total; i += batchSize) {
      if (this.isDestroyed) return;
      const currentBatch: Promise<void>[] = [];
      for (let j = i; j < Math.min(i + batchSize, total); j += step) {
        if (!this.cache[j]) {
          currentBatch.push(this.loadSingleFrame(j));
        }
      }
      await Promise.allSettled(currentBatch);
      // Small tick between batches to prevent main-thread starvation
      await new Promise((r) => setTimeout(r, 8));
    }
  }

  private async loadSingleFrame(index: number): Promise<void> {
    if (this.cache[index] || this.isDestroyed) return;

    // Frame indices on disk are 1-based (frame_00001.webp to frame_01200.webp)
    const url = SCROLLYTELLING_CONFIG.getFramePath(index + 1);

    try {
      const img = new Image();
      img.src = url;

      // Use decode() for pre-rasterized GPU preparation
      try {
        await img.decode();
      } catch {
        // Fallback for environments where decode() rejects or isn't supported
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
        });
      }

      if (this.isDestroyed) return;

      // If createImageBitmap is available, convert for maximum canvas draw throughput
      if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
        try {
          const bitmap = await createImageBitmap(img);
          this.cache[index] = bitmap;
        } catch {
          this.cache[index] = img;
        }
      } else {
        this.cache[index] = img;
      }

      this.loadedSet.add(index);

      if (this.onProgressCallback) {
        const total = SCROLLYTELLING_CONFIG.frameCount;
        const percent = Math.min(100, Math.round((this.loadedSet.size / total) * 100));
        this.onProgressCallback(percent, this.loadedSet.size);
      }
    } catch {
      // If a single frame fails, nearest-neighbor fallback smoothly handles it
    }
  }

  public destroy() {
    this.isDestroyed = true;
    for (let i = 0; i < this.cache.length; i++) {
      const item = this.cache[i];
      if (item && 'close' in item && typeof item.close === 'function') {
        item.close();
      }
    }
    this.cache = [];
    this.loadedSet.clear();
  }
}
