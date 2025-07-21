import { config } from './config/gameConfig';
import { AnimationConfig } from './types';

/**
 * Класс для анимации спрайтов.
 *
 * Позволяет управлять анимациями, переключать состояния и отрисовывать текущий кадр.
 */
export class SpriteAnimator<T extends string = string> {
  private defaultSpriteSheet: CanvasImageSource;
  private animations: Map<T, AnimationConfig>;
  private currentState: T | null;
  private currentFrameIndex: number;
  private frameTimer: number;
  private isPlaying: boolean;
  private _onAnimationComplete?: (state: T) => void;
  private onStateChange?: (oldState: T | null, newState: T) => void;

  constructor(defaultSpriteSheet: CanvasImageSource, defaultState?: T) {
    this.defaultSpriteSheet = defaultSpriteSheet;
    this.animations = new Map();
    this.currentState = null;
    this.currentFrameIndex = 0;
    this.frameTimer = 0;
    this.isPlaying = false;

    if (defaultState) {
      this.state = defaultState;
    }
  }

  /**
   * Добавляет конфигурацию анимации для определенного состояния
   */
  addAnimation(state: T, config: AnimationConfig): void {
    this.animations.set(state, config);
  }

  /**
   * Устанавливает текущее состояние анимации
   */
  private setState(state: T): void {
    if (this.currentState === state) {
      return;
    }

    const oldState = this.currentState;

    this.currentState = state;
    this.currentFrameIndex = 0;
    this.frameTimer = 0;
    this.isPlaying = true;

    this.onStateChange?.(oldState, state);
  }

  /**
   * Получает текущее состояние анимации
   */
  get state(): T | null {
    return this.currentState;
  }

  /**
   * Устанавливает текущее состояние анимации
   */
  set state(newState: T | null) {
    if (newState !== null) {
      this.setState(newState);
    }
  }

  /**
   * Устанавливает колбэк для завершения анимации
   */
  set onAnimationComplete(callback: (state: T) => void) {
    this._onAnimationComplete = callback;
  }

  /**
   * Обновляет анимацию на основе времени, прошедшего с последнего кадра
   */
  update(delta: number, gameSpeed: number): void {
    if (!this.isPlaying || !this.currentState) return;

    const animation = this.animations.get(this.currentState);

    if (!animation || animation.frames.length === 0) {
      console.warn(`No animation found for state: ${this.currentState}`);
      return;
    }

    const deltaTimeScaled = gameSpeed * delta * config.fps;
    this.frameTimer += deltaTimeScaled;
    const frameDuration = config.fps / animation.frameRate;

    if (this.frameTimer >= frameDuration) {
      this.frameTimer = 0;
      this.currentFrameIndex++;

      // Проверяем, достигли ли конца анимации
      if (this.currentFrameIndex >= animation.frames.length) {
        if (animation.loop) {
          this.currentFrameIndex = 0;
        } else {
          this.currentFrameIndex = animation.frames.length - 1;
          this.isPlaying = false;
          this._onAnimationComplete?.(this.currentState);
        }
      }
    }
  }

  /**
   * Отрисовывает текущий кадр анимации
   */
  render(ctx: CanvasRenderingContext2D, x: number, y: number, width?: number, height?: number): void {
    if (!this.currentState) {
      console.warn('SpriteAnimator render: нет текущего состояния');
      return;
    }

    const animation = this.animations.get(this.currentState);

    if (!animation || animation.frames.length === 0) {
      console.warn(`SpriteAnimator render: no animation for state ${this.currentState}`);
      return;
    }

    const frame = animation.frames[this.currentFrameIndex];
    const renderWidth = width || frame.width;
    const renderHeight = height || frame.height;
    const spriteSheet = animation.spriteSheet || this.defaultSpriteSheet;

    ctx.drawImage(spriteSheet, frame.x, frame.y, frame.width, frame.height, x, y, renderWidth, renderHeight);
  }
}
