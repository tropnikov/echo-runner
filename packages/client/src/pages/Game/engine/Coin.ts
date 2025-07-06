import { config } from './config'
import { GameObject } from './GameObject'
import { ObjectEffectType } from './types'

/**
 * Класс для создания игровых объектов типа "монета".
 *
 * Наследуется от GameObject и реализует логику генерации и отрисовки коллизий.
 */
export class Coin extends GameObject {
  private collisionSize: number = config.coins.collisionSize

  effectType = ObjectEffectType.Score

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx)
  }

  private addCoinCollision(x: number) {
    const gapY =
      config.coins.minDistanceY +
      Math.random() * (config.coins.maxDistanceY - config.coins.minDistanceY)

    this.addCollision({
      width: this.collisionSize,
      height: this.collisionSize,
      x,
      y: gapY,
    })
  }

  update(delta: number, gameSpeed: number): void {
    this.updateCollisions({
      minDistanceX: config.coins.minDistanceX,
      maxDistanceX: config.coins.maxDistanceX,
      callback: (x: number) => this.addCoinCollision(x),
    })

    const dx = gameSpeed * delta * config.fps

    this.collisions.forEach(collision => {
      collision.x -= dx
    })
  }

  render(): void {
    this._collisions.forEach(collision => {
      const invertCollision = this.toCanvasCoords(collision)

      this.ctx.fillStyle = 'gold'
      this.ctx.fillRect(
        invertCollision.x,
        invertCollision.y,
        invertCollision.width,
        invertCollision.height
      )
    })
  }
}
