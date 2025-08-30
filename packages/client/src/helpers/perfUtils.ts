/** Переводит байты в мегабайты */
export function bytesToMB(bytes?: number): number {
  return typeof bytes === 'number' && Number.isFinite(bytes) ? bytes / 1024 / 1024 : 0;
}

/** Считает p99 для массива интервалов */
export function computeP99(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.max(0, Math.floor(0.99 * (sorted.length - 1)));
  return sorted[idx];
}

/** Базовые метрики по окну dt (интервалов между кадрами) */
export function computeFrameStats(buf: number[], dropThreshold: number, longThreshold: number) {
  const n = buf.length || 1;
  const avg = buf.reduce((a, b) => a + b, 0) / n;
  const fps = avg > 0 ? 1000 / avg : 0;
  const drops = buf.filter((x) => x > dropThreshold).length;
  const long = buf.filter((x) => x > longThreshold).length;

  return { avg, fps, drops, long };
}
