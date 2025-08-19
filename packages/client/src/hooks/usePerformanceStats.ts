import { useCallback, useRef, useState } from 'react';

declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

type PerfStats = {
  fps: number;
  avg: number; // средний межкадровый интервал (мс)
  p99: number; // p99 интервала (мс)
  drops: number; // dt > 50мс
  long: number; // dt > 16.7мс
  mem: number;
};

export type Stats = PerfStats;

const WINDOW = 120; // ~2s при 60 Гц

export function usePerformanceStats() {
  const lastRef = useRef<number | null>(null);
  const bufRef = useRef<number[]>([]);
  const [stats, setStats] = useState<PerfStats>({
    fps: 0,
    avg: 0,
    p99: 0,
    drops: 0,
    long: 0,
    mem: 0,
  });

  const beginFrame = useCallback(() => {
    const now = performance.now();
    const last = lastRef.current;
    if (last != null) {
      const dt = now - last;
      const buf = bufRef.current;
      buf.push(dt);
      if (buf.length > WINDOW) buf.shift();

      const n = buf.length || 1;
      const sum = buf.reduce((a, b) => a + b, 0);
      const avg = sum / n;
      const sorted = [...buf].sort((a, b) => a - b);
      const p99 = sorted[Math.max(0, Math.floor(0.99 * (n - 1)))];
      const fps = 1000 / avg;

      const drops = buf.filter((x) => x > 50).length;
      const long = buf.filter((x) => x > 16.7).length;

      let mem = 0;

      if (performance.memory?.usedJSHeapSize) {
        mem = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
      }

      setStats((s) => ({ ...s, fps: Math.round(fps), avg, p99, drops, long, mem }));
    }
    lastRef.current = now;
  }, []);

  const endFrame = useCallback(() => {
    // опционально: можно мерить «work time» кадра отдельно, но не для fps
  }, []);

  const reset = useCallback(() => {
    lastRef.current = null;
    bufRef.current = [];
    setStats((s) => ({ ...s, fps: 0, avg: 0, p99: 0, drops: 0, long: 0 }));
  }, []);

  return { beginFrame, endFrame, stats, reset };
}
