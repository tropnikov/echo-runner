type FrameConfig = { width: number; height: number; frames: number };

type SpriteFrameData = { x: number; y: number; width: number; height: number };

export function generateFrames({ width, height, frames }: FrameConfig): SpriteFrameData[] {
  const result: SpriteFrameData[] = [];

  for (let i = 0; i < frames; i++) {
    const x = width * i;
    const y = 0; // В данном случае y всегда 0, так как мы генерируем только одну строку кадров
    result.push({ x, y, width, height });
  }

  return result;
}
