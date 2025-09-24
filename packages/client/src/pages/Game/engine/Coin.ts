import CoinImage from '../assets/coin.png';
import { config } from './config/gameConfig';
import { GameObject } from './GameObject';
import { ObjectEffectType } from './types';

/**
 * Класс для создания игровых объектов типа "монета".
 *
 * Наследуется от GameObject и реализует логику генерации и отрисовки коллизий.
 */
export class Coin extends GameObject {
  private collisionSize: number = config.coins.collisionSize;

  private coinImage: HTMLImageElement;

  effectType = ObjectEffectType.Score;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.coinImage = new Image();
    this.coinImage.src = CoinImage;
  }

  private addCoinCollision(x: number) {
    const gapY = config.coins.minDistanceY + Math.random() * (config.coins.maxDistanceY - config.coins.minDistanceY);

    this.addCollision({
      width: this.collisionSize,
      height: this.collisionSize,
      x,
      y: gapY,
    });
  }

  update(delta: number, gameSpeed: number): void {
    // Удаляем собранные монеты и вышедшие за экран
    this._collisions = this._collisions.filter((c) => !c.handled && c.x + c.width > 0);

    this.updateCollisions({
      minDistanceX: config.coins.minDistanceX,
      maxDistanceX: config.coins.maxDistanceX,
      callback: (x: number) => this.addCoinCollision(x),
    });

    const dx = gameSpeed * delta * config.fps;

    this.collisions.forEach((collision) => {
      collision.x -= dx;
    });
  }

  render(): void {
    this._collisions.forEach((collision) => {
      // Не отображаем монеты, которые уже собраны
      if (collision.handled) return;
      const invertCollision = this.toCanvasCoords(collision);

      if (this.coinImage.complete) {
        this.ctx.drawImage(
          this.coinImage,
          invertCollision.x,
          invertCollision.y,
          invertCollision.width,
          invertCollision.height,
        );
      }
    });
  }
}
