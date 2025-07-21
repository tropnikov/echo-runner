import { config } from './config/gameConfig';
import { GameObject } from './GameObject';
import { ObjectEffectType } from './types';

/**
 * Класс для реализации бесшовной параллакс-анимации фона
 *
 * Создает эффект глубины за счет движения фона с отличной от игровых объектов скоростью
 */
export class ParallaxBackground extends GameObject {
  private backgroundImage: CanvasImageSource;

  private backgroundWidth: number;

  private backgroundHeight: number;

  private offsetX: number;

  private speedMultiplier: number;

  effectType = ObjectEffectType.None;

  constructor(ctx: CanvasRenderingContext2D, backgroundImage: CanvasImageSource, speedMultiplier = 0.5) {
    super(ctx);

    this.speedMultiplier = speedMultiplier;
    this.backgroundImage = backgroundImage;
    this.backgroundWidth = (backgroundImage as HTMLImageElement).width;
    this.backgroundHeight = (backgroundImage as HTMLImageElement).height;
    this.offsetX = 0;

    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Обновляет позицию фона
   */
  update(gameSpeed: number, delta: number): void {
    const backgroundSpeed = gameSpeed * this.speedMultiplier;
    const dx = backgroundSpeed * delta * config.fps;

    this.offsetX -= dx;
    this.offsetX = this.offsetX % this.backgroundWidth;
  }

  /**
   * Отрисовывает параллакс-фон
   */
  render(): void {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    const tilesNeeded = Math.ceil(canvasWidth / this.backgroundWidth) + 1;

    for (let i = 0; i < tilesNeeded; i++) {
      const x = Math.floor(this.offsetX + i * this.backgroundWidth);

      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.backgroundWidth,
        this.backgroundHeight,
        x,
        0,
        this.backgroundWidth,
        canvasHeight,
      );
    }
  }
}
