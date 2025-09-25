import SoundBoom from '../assets/sound/boom.mp3';
import SoundJumpUp from '../assets/sound/jump-up.mp3';
import SoundMain from '../assets/sound/main.mp3';
import SoundScore from '../assets/sound/score.mp3';
import { config } from './config/gameConfig';
import { EventBus } from './EventBus';
import { GameObject } from './GameObject';
import { ParallaxBackground } from './ParallaxBackground';
import { Player } from './Player';
import { SoundEngine } from './SoundEngine';
import { Collision, Events, ObjectEffectType, SoundName } from './types';

export type FrameHooks = { before?: () => void; after?: () => void };

/**
 * Класс игрового движка, управляющего обновлением и рендерингом сцены.
 *
 * Отвечает за цикл игры, управление сценой и состоянием (запуск, пауза, остановка).
 */
export class GameEngine {
  private ctx: CanvasRenderingContext2D;

  private onDamage: () => void;

  private onScore: () => void;

  private gameObjects: GameObject[] = [];

  private parallaxBackground: ParallaxBackground | null = null;

  private soundEngine: SoundEngine;

  private animationId: number | null = null;

  private gameSpeed = config.initialSpeed;

  private lastTime: number | null = null;

  private speedTimer = 0;

  private hooks: FrameHooks = {};

  private eventBus: EventBus;

  constructor(props: { ctx: CanvasRenderingContext2D; onDamage: () => void; onScore: () => void }) {
    this.onDamage = props.onDamage;
    this.onScore = props.onScore;
    this.ctx = props.ctx;
    this.eventBus = EventBus.getInstance();
    this.soundEngine = new SoundEngine();
  }

  setFrameHooks(h: FrameHooks) {
    this.hooks = h;
    return this;
  }

  /**
   * Добавляет объект сцены в список для обновления и рендеринга.
   */
  initGameObject(gameObjects: GameObject) {
    this.gameObjects.push(gameObjects);
    return this;
  }

  /**
   * Инициализирует параллакс-фон.
   */
  initParallaxBackground(backgroundImage: CanvasImageSource, speedMultiplier = 0.5) {
    this.parallaxBackground = new ParallaxBackground(this.ctx, backgroundImage, speedMultiplier);
    return this;
  }

  /**
   * Основной цикл игрового движка.
   */
  private loop() {
    const sceneTimer = (now: number) => {
      if (!this.animationId) return;
      if (this.lastTime === null) this.lastTime = now;

      this.hooks.before?.();

      try {
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.updateGameSpeed(deltaTime);
        this.clearScene();

        this.renderSceneBackground(deltaTime);

        this.gameObjects.forEach((obj) => obj.update(deltaTime, this.gameSpeed));
        this.checkCollisions();
        this.gameObjects.forEach((obj) => obj.render());
      } finally {
        this.hooks.after?.();
      }
      this.animationId = requestAnimationFrame(sceneTimer);
    };

    this.animationId = requestAnimationFrame(sceneTimer);
  }

  /**
   * Обновляет скорость игры.
   */
  private updateGameSpeed(delta: number) {
    this.speedTimer += delta;

    if (this.speedTimer >= config.levelDuration) {
      this.gameSpeed += config.levelSpeedIncrement;
      this.speedTimer = 0;
    }
  }

  /**
   * Очищает весь холст перед новым кадром.
   */
  private clearScene() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Сохраняем ссылки на bound методы для возможности отписки
  private boundHandlePlayerJumpUp = this.handlePlayerJumpUp.bind(this);

  /**
   * Инициализирует движок.
   */
  init() {
    this.eventBus.on(Events.PlayerJumpUp, this.boundHandlePlayerJumpUp);

    this.soundEngine.addSound(SoundName.PlayerJumpUp, SoundJumpUp);
    this.soundEngine.addSound(SoundName.Obstacle, SoundBoom);
    this.soundEngine.addSound(SoundName.Coin, SoundScore);
    this.soundEngine.addSound(SoundName.Main, SoundMain);

    return this;
  }

  /**
   * Запускает игру.
   */
  start() {
    if (this.animationId !== null) {
      console.warn('Игра уже запущена');
      return;
    }

    this.gameSpeed = config.initialSpeed;
    this.speedTimer = 0;
    this.lastTime = null;
    this.loop();
    this.soundEngine.play(SoundName.Main, true);
  }

  private resetAnimationFrame() {
    if (!this.animationId) return;
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  /**
   * Останавливает игру.
   */
  stop() {
    this.resetAnimationFrame();
    this.soundEngine.stop(SoundName.Main);
  }

  /**
   * Приостанавливает игру.
   */
  pause() {
    this.resetAnimationFrame();
    this.soundEngine.pause(SoundName.Main);
  }

  /**
   * Возобновляет игру.
   */
  resume() {
    if (this.animationId) return;
    this.lastTime = null;
    this.loop();
    this.soundEngine.play(SoundName.Main, true);
  }

  muteSound(status: boolean) {
    this.soundEngine.setMute(status);
  }

  /**
   * Полная очистка ресурсов движка.
   * Отписывается от событий, очищает звуки, останавливает анимацию.
   */
  destroy() {
    // Останавливаем игру
    this.stop();

    // Отписываемся от событий EventBus
    this.eventBus.off(Events.PlayerJumpUp, this.boundHandlePlayerJumpUp);

    // Очищаем звуковой движок
    this.soundEngine.destroy();

    // Очищаем ссылки на объекты
    this.gameObjects = [];
    this.parallaxBackground = null;
  }

  /**
   * Сбрасывает состояние игры.
   */
  public clearAndRenderEmpty() {
    this.clearScene();
    return this;
  }

  /**
   * Удаляет все объекты сцены.
   */
  removeAllSceneObjects() {
    this.gameObjects = [];
    // Сбрасываем позицию параллакс-фона
    if (this.parallaxBackground) {
      // ParallaxBackground автоматически сбросится при следующем update
    }
    return this;
  }

  /**
   * Проверяет пересечение двух коллизий.
   */
  private isColliding(a: Collision, b: Collision): boolean {
    return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
  }

  /**
   * Проверяет столкновения.
   */
  private checkCollisions() {
    const player = this.gameObjects.find((p) => p instanceof Player) as Player;

    if (!player) return;

    const others = this.gameObjects.filter((obj) => obj !== player);

    for (const obj of others) {
      for (const collision of obj.collisions) {
        if (collision.handled) continue;
        if (!this.isColliding(player.collision, collision)) continue;

        switch (obj.effectType) {
          case ObjectEffectType.Score:
            // Проигрывает звук когда игрок хватает монету
            this.soundEngine?.play(SoundName.Coin);

            this.onScore();
            collision.handled = true;
            break;
          case ObjectEffectType.Damage:
            // Проигрывает звук при столкновении игрока с препятствием
            this.soundEngine?.play(SoundName.Obstacle);

            this.onDamage();
            collision.handled = true;
            break;
          default:
            break;
        }

        break;
      }
    }
  }

  /**
   * Рендерит фон сцены (параллакс или обычный).
   */
  private renderSceneBackground(deltaTime: number) {
    if (this.parallaxBackground) {
      this.parallaxBackground.update(deltaTime, this.gameSpeed);
      this.parallaxBackground.render();
    } else {
      this.renderBackground();
    }
  }

  /**
   * Отрисовывает фон сцены.
   */
  private renderBackground() {
    this.ctx.fillStyle = 'lightblue';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Проигрывает звук когда игрок летит вверх
   */
  private handlePlayerJumpUp() {
    this.soundEngine?.play(SoundName.PlayerJumpUp);
  }
}
