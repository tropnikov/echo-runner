import { config } from './config';
import { GameObject } from './GameObject';
import { Collision, ObjectEffectType } from './types';

/**
 * Класс для создания игровых объектов типа "игрок".
 *
 * Наследуется от GameObject и реализует логику прыжка и гравитации.
 */
export class Player extends GameObject {
  private _collision: Collision;

  private jumpVelocity = 0;

  private gravity: number = config.player.gravity;

  private jumpPower: number = config.player.jumpPower;

  private isJumping = false;

  effectType = ObjectEffectType.None;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this._collision = {
      ...config.player.collisionSize,
      ...config.player.offset,
    };
  }

  get collision(): Collision {
    return this._collision;
  }

  /**
   * Прыжок.
   */
  jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.jumpVelocity = this.jumpPower;
  }

  update(delta: number) {
    this.jumpVelocity -= this.gravity * delta * config.fps;
    this._collision.y += this.jumpVelocity * delta * config.fps;

    const groundY = 0;

    // Проверка касания земли
    if (this._collision.y <= groundY) {
      this._collision.y = groundY;
      this.jumpVelocity = 0;
      this.isJumping = false;
    }
  }

  render() {
    const invertCollision = this.toCanvasCoords(this._collision);

    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(invertCollision.x, invertCollision.y, invertCollision.width, invertCollision.height);
  }
}
