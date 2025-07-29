import { config } from './config/gameConfig';
import { playerAnimations, PlayerAnimationState } from './config/playerAnimations';
import { GameObject } from './GameObject';
import { SpriteAnimator } from './SpriteAnimator';
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

  private animator: SpriteAnimator<PlayerAnimationState>;

  effectType = ObjectEffectType.None;

  constructor(ctx: CanvasRenderingContext2D, spriteSheet: CanvasImageSource) {
    super(ctx);

    this._collision = {
      ...config.player.collisionSize,
      ...config.player.offset,
    };

    // Инициализируем аниматор
    this.animator = this.createAnimator(spriteSheet);
    this.setupAnimationCallbacks();
  }

  get collision(): Collision {
    return this._collision;
  }

  /**
   * Создает и настраивает аниматор для игрока
   */
  private createAnimator(spriteSheet: CanvasImageSource): SpriteAnimator<PlayerAnimationState> {
    const animator = new SpriteAnimator<PlayerAnimationState>(spriteSheet, PlayerAnimationState.RUNNING);

    Object.entries(playerAnimations).forEach(([state, config]) => {
      animator.addAnimation(state as PlayerAnimationState, config);
    });

    return animator;
  }

  /**
   * Настраивает колбэки для анимации
   */
  private setupAnimationCallbacks(): void {
    this.animator.onAnimationComplete = (state) => {
      if (state === PlayerAnimationState.JUMPING && !this.isJumping) {
        this.updateAnimationState();
      }
    };

    this.updateAnimationState();
  }

  /**
   * Обновляет состояние анимации в зависимости от состояния игрока
   */
  private updateAnimationState(): void {
    if (this.isJumping) {
      this.animator.state = PlayerAnimationState.JUMPING;
    } else {
      this.animator.state = PlayerAnimationState.RUNNING;
    }
  }

  /**
   * Прыжок.
   */
  jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.jumpVelocity = this.jumpPower;

    this.updateAnimationState();
  }

  update(delta: number, gameSpeed: number): void {
    this.jumpVelocity -= this.gravity * delta * config.fps;
    this._collision.y += this.jumpVelocity * delta * config.fps;

    const groundY = config.player.offset.y;

    // Проверка касания земли
    if (this._collision.y <= groundY) {
      this._collision.y = groundY;
      this.jumpVelocity = 0;

      const wasJumping = this.isJumping;
      this.isJumping = false;

      if (wasJumping) {
        this.updateAnimationState();
      }
    }

    this.animator.update(delta, gameSpeed);
  }

  render() {
    const renderPosition = this.toCanvasCoords(this._collision);
    this.animator.render(this.ctx, renderPosition.x, renderPosition.y, this._collision.width, this._collision.height);
  }
}
