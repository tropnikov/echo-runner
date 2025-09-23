import BoxImage from '../assets/box.png';
import { config } from './config/gameConfig';
import { GameObject } from './GameObject';
import { ObjectEffectType } from './types';

/**
 * Класс для создания игровых объектов типа "препятствие".
 *
 * Наследуется от GameObject и реализует логику генерации и отрисовки коллизий.
 */
export class Obstacle extends GameObject {
  private collisionSize: number = config.obstacles.collisionSize;

  private boxImage: HTMLImageElement;

  effectType = ObjectEffectType.Damage;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.boxImage = new Image();
    this.boxImage.src = BoxImage;
  }

  private addObstacleCollision(x: number) {
    this.addCollision({
      width: this.collisionSize,
      height: this.collisionSize,
      x,
      y: config.obstacles.offsetY,
    });
  }

  update(delta: number, gameSpeed: number): void {
    this.updateCollisions({
      minDistanceX: config.obstacles.minDistanceX,
      maxDistanceX: config.obstacles.maxDistanceX,
      callback: (x: number) => this.addObstacleCollision(x),
    });

    const dx = gameSpeed * delta * config.fps;

    this._collisions.forEach((collision) => {
      collision.x -= dx;
    });
  }

  render(): void {
    this._collisions.forEach((collision) => {
      const invertCollision = this.toCanvasCoords(collision);

      if (this.boxImage.complete) {
        this.ctx.drawImage(
          this.boxImage,
          invertCollision.x,
          invertCollision.y,
          invertCollision.width,
          invertCollision.height,
        );
      }
    });
  }
}
