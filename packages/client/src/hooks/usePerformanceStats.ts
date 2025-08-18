import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Stats = {
  fps: number;
  frameMsAvg: number;
  frameMsP99: number;
  droppedFrames: number;
  longTasks: number;
  memMB?: number;
};

const MAX_SAMPLES = 300; // ~5 сек при 60fps
const DROP_THRESHOLD = 1000 / 55; // считаем дропом, если кадр дольше ~18мс
// const IDLE_THRESHOLD_MS = 250; // если rAF молчит — включаем фолбэк

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}
/** Хук сбора перф-метрик рендера (fps, p99, long tasks, memory). */
export function usePerformanceStats() {
  // накопители
  const samples = useRef<number[]>([]);

  const dropped = useRef(0);
  const longTasks = useRef(0);

  // таймстемпы
  const lastT = useRef<number | null>(null);
  const lastRealTick = useRef<number>(0);
  const fallbackLast = useRef<number | null>(null);

  const [stats, setStats] = useState<Stats>({
    fps: 0,
    frameMsAvg: 0,
    frameMsP99: 0,
    droppedFrames: 0,
    longTasks: 0,
    memMB: undefined,
  });

  const beginFrame = useCallback(() => {
    lastT.current = performance.now();
  }, []);

  const endFrame = useCallback(() => {
    const now = performance.now();
    const prev = lastT.current ?? now;
    const dt = now - prev;

    if (dt <= 0.5 || dt > 1000) {
      lastT.current = now;
      return;
    }

    lastT.current = now;
    lastRealTick.current = now;

    samples.current.push(dt);
    if (dt > DROP_THRESHOLD) dropped.current += 1;
    if (samples.current.length > MAX_SAMPLES) samples.current.shift();
  }, []);

  // агрегируем метрики раз в 0.5с
  useEffect(() => {
    const id = window.setInterval(() => {
      const arr = samples.current;
      if (!arr.length) return;

      const duration = arr.reduce((a, b) => a + b, 0);
      const fps = duration > 0 ? Math.round((arr.length / duration) * 1000) : 0;

      const avg = duration / arr.length;
      const sorted = [...arr].sort((a, b) => a - b);
      const idx = Math.max(0, Math.floor(0.99 * (sorted.length - 1)));
      const p99 = sorted[idx];

      const perf = performance as PerformanceWithMemory;
      const mem = perf.memory ? Math.round(perf.memory.usedJSHeapSize / 1024 / 1024) : undefined;

      setStats({
        fps,
        frameMsAvg: Math.round(avg * 10) / 10,
        frameMsP99: Math.round(p99 * 10) / 10,
        droppedFrames: dropped.current,
        longTasks: longTasks.current,
        memMB: mem,
      });
    }, 500);

    return () => window.clearInterval(id);
  }, []);

  // Long Task API (если доступно)
  // useEffect(() => {
  //   if (typeof PerformanceObserver === 'undefined') return;
  //   try {
  //     const obs = new PerformanceObserver((list) => {
  //       longTasks.current += list.getEntries().length;
  //     });
  //     obs.observe({ type: 'longtask', buffered: true });
  //     return () => obs.disconnect();
  //   } catch {
  //     // игнор, если недоступно
  //   }
  // }, []);

  // Фолбэк-тикер: если реальных кадров нет > IDLE_THRESHOLD_MS — подкидываем синтетические (~60fps)
  //   useEffect(() => {
  //     let rafId = 0;
  //     const loop = () => {
  //       const now = performance.now();
  //       const idle = now - lastRealTick.current;

  //       if (idle > IDLE_THRESHOLD_MS) {
  //         const prev = fallbackLast.current ?? now - 1000 / 60;
  //         const dt = now - prev;
  //         fallbackLast.current = now;

  //         samples.current.push(dt);
  //         if (dt > DROP_THRESHOLD) dropped.current += 1;
  //         if (samples.current.length > MAX_SAMPLES) samples.current.shift();
  //       } else {
  //         fallbackLast.current = null;
  //       }

  //       rafId = requestAnimationFrame(loop);
  //     };

  //     rafId = requestAnimationFrame(loop);
  //     return () => cancelAnimationFrame(rafId);
  //   }, []);

  const reset = useCallback(() => {
    samples.current = [];
    dropped.current = 0;
    longTasks.current = 0;
    lastT.current = null;
    lastRealTick.current = 0;
    fallbackLast.current = null;

    setStats((s) => ({
      ...s,
      fps: 0,
      frameMsAvg: 0,
      frameMsP99: 0,
      droppedFrames: 0,
      longTasks: 0,
    }));
  }, []);

  return useMemo(() => ({ beginFrame, endFrame, stats, reset }), [beginFrame, endFrame, stats, reset]);
}
