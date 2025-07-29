import { GameEngine } from '../engine/GameEngine';

export function initParallaxBackground(engine: GameEngine, backgroundImage: string, speedMultiplier = 0.5): void {
  const img = new window.Image();
  img.src = backgroundImage;
  img.onload = () => engine.initParallaxBackground(img, speedMultiplier);
}
