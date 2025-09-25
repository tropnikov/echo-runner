import { config } from './config/gameConfig';
import { playerAnimations, PlayerAnimationState } from './config/playerAnimations';
import { EventBus } from './EventBus';
import { GameObject } from './GameObject';
import { SpriteAnimator } from './SpriteAnimator';
import { Collision, Events, ObjectEffectType } from './types';

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

  private maxJumps: number = config.player.maxJumps;

  private remainingJumps: number = config.player.maxJumps;

  private animator: SpriteAnimator<PlayerAnimationState>;

  private eventBus: EventBus;

  private jumpUpEmitted = false;

  private jumpDownEmitted = false;

  effectType = ObjectEffectType.None;

  constructor(ctx: CanvasRenderingContext2D, spriteSheet: CanvasImageSource) {
    super(ctx);

    this._collision = {
      ...config.player.collisionSize,
      ...config.player.offset,
    };

    this.eventBus = EventBus.getInstance();

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
    this.jumpUpEmitted = false;
    this.jumpDownEmitted = false;

    // Разрешаем прыжок, если есть оставшиеся попытки (поддержка двойного прыжка)
    if (this.remainingJumps <= 0) return;

    this.isJumping = true;
    this.jumpVelocity = this.jumpPower;
    this.remainingJumps -= 1;

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
      this.remainingJumps = this.maxJumps;

      if (wasJumping) {
        this.updateAnimationState();
      }
    }

    // Когда игрок движется вверх при прыжке
    if (this.jumpVelocity > 0 && !this.jumpUpEmitted) {
      this.eventBus.emit(Events.PlayerJumpUp);
      this.jumpUpEmitted = true;
    }

    // Когда игрок движется вниз при прыжке
    if (this.jumpVelocity < 0 && !this.jumpDownEmitted) {
      this.eventBus.emit(Events.PlayerJumpDown);
      this.jumpDownEmitted = true;
    }

    this.animator.update(delta, gameSpeed);
  }

  render() {
    const renderPosition = this.toCanvasCoords(this._collision);
    this.animator.render(this.ctx, renderPosition.x, renderPosition.y, this._collision.width, this._collision.height);
  }

  /**
   * Сброс состояния игрока (для рестартов сцены).
   */
  reset() {
    super.reset();
    this.jumpVelocity = 0;
    this.isJumping = false;
    this.remainingJumps = this.maxJumps;
    this._collision = {
      ...config.player.collisionSize,
      ...config.player.offset,
    };
    this.updateAnimationState();
    return this;
  }
}
