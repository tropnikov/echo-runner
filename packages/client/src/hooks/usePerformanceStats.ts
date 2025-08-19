import { useCallback, useRef, useState } from 'react';

/**
 * Расширяем глобальный Performance для Chrome/Chromium:
 * performance.memory.* (может быть недоступно в Safari/Firefox)
 */
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

/** Окно усреднения: ~2 секунды при 60 Гц */
const WINDOW_FRAMES = 120;
/** Порог «длинного» кадра (≈60 Гц) */
const LONG_FRAME_MS = 16.7;
/** Порог «просадки»/дропа */
const DROP_FRAME_MS = 50;
/** Как часто пересчитывать p99 (снижает аллокации/сортировку) */
const P99_INTERVAL_FRAMES = 10;

type PerfStats = {
  /** Кадров в секунду (расчёт по среднему межкадровому dt) */
  fps: number;
  /** Средний межкадровый интервал, мс */
  avg: number;
  /** 99‑й перцентиль межкадрового интервала, мс */
  p99: number;
  /** Кол-во «дропов» (dt > DROP_FRAME_MS) в текущем окне */
  drops: number;
  /** Кол-во длинных кадров (dt > LONG_FRAME_MS) в текущем окне */
  long: number;
  /** Использование JS‑heap (MB), 0 если недоступно */
  mem: number;
};

export type Stats = PerfStats;

/**
 * Хук метрик производительности.
 * FPS считается по межкадровому интервалу (dt между RAF), а не по «времени работы кадра».
 */
export function usePerformanceStats() {
  // предыдущее время кадра
  const lastTsRef = useRef<number | null>(null);
  // скользящее окно межкадровых интервалов
  const dtBufferRef = useRef<number[]>([]);
  // счётчик кадров — чтобы реже пересчитывать p99
  const frameCounterRef = useRef(0);

  const [stats, setStats] = useState<PerfStats>({
    fps: 0,
    avg: 0,
    p99: 0,
    drops: 0,
    long: 0,
    mem: 0,
  });

  const readMemoryMB = (): number => {
    const m = performance.memory?.usedJSHeapSize;
    return typeof m === 'number' && Number.isFinite(m) ? m / 1024 / 1024 : 0;
  };

  const computeP99 = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    // копию сортируем, чтобы не мутировать буфер
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = Math.max(0, Math.floor(0.99 * (sorted.length - 1)));
    return sorted[idx];
  };

  const beginFrame = useCallback(() => {
    const now = performance.now();
    const last = lastTsRef.current;

    if (last != null) {
      const dt = now - last;
      const buf = dtBufferRef.current;

      // пополняем буфер межкадровых интервалов
      buf.push(dt);
      if (buf.length > WINDOW_FRAMES) buf.shift();

      // быстрые метрики без тяжёлой сортировки
      const n = buf.length || 1;
      const sum = buf.reduce((a, b) => a + b, 0);
      const avg = sum / n;
      const fps = avg > 0 ? 1000 / avg : 0;
      const drops = buf.filter((x) => x > DROP_FRAME_MS).length;
      const long = buf.filter((x) => x > LONG_FRAME_MS).length;

      frameCounterRef.current += 1;
      const shouldRecalcP99 = frameCounterRef.current % P99_INTERVAL_FRAMES === 0;
      const p99 = shouldRecalcP99 ? computeP99(buf) : stats.p99;

      setStats({
        fps: Math.round(fps),
        avg,
        p99,
        drops,
        long,
        mem: readMemoryMB(), // 0 если недоступно
      });
    }

    lastTsRef.current = now;
  }, [stats.p99]);

  const endFrame = useCallback(() => {
    /* noop */
  }, []);

  const reset = useCallback(() => {
    lastTsRef.current = null;
    dtBufferRef.current = [];
    frameCounterRef.current = 0;
    setStats({ fps: 0, avg: 0, p99: 0, drops: 0, long: 0, mem: 0 });
  }, []);

  return { beginFrame, endFrame, stats, reset };
}
