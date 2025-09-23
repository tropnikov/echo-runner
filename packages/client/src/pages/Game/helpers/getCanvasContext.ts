import { RefObject } from 'react';

export function getCanvasContext(ref: RefObject<HTMLCanvasElement>) {
  const canvas = ref.current;
  if (!canvas) return null;
  return canvas.getContext('2d', { willReadFrequently: true });
}
