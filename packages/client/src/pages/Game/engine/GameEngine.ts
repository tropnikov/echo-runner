import { config } from './config';
import { GameObject } from './GameObject';
import { Player } from './Player';
import { Collision, ObjectEffectType } from './types';

/**
 * Класс игрового движка, управляющего обновлением и рендерингом сцены.
 *
 * Отвечает за цикл игры, управление сценой и состоянием (запуск, пауза, остановка).
 */
export class GameEngine {
  private ctx: CanvasRenderingContext2D;

  private onDamage: () => void;

  private onScore: () => void;

  private sceneParts: GameObject[] = [];

  private animationId: number | null = null;

  private isPaused = false;

  private gameSpeed = config.initialSpeed;

  private lastTime = 0;

  private speedTimer = 0;

  private isRunning = false;
  private lastTimestamp = 0;

  constructor(props: { ctx: CanvasRenderingContext2D; onDamage: () => void; onScore: () => void }) {
    this.onDamage = props.onDamage;
    this.onScore = props.onScore;
    this.ctx = props.ctx;
  }

  /**
   * Добавляет объект сцены в список для обновления и рендеринга.
   */
  initSceneObject(sceneObject: GameObject) {
    this.sceneParts.push(sceneObject);
    return this;
  }

  /**
   * Основной цикл игрового движка.
   */
  private loop() {
    this.lastTime = performance.now();

    const sceneTimer = (now: number) => {
      if (this.isPaused) return;

      const deltaTime = (now - this.lastTime) / 1000;
      this.lastTime = now;

      this.updateGameSpeed(deltaTime);
      this.clearScene();

      this.renderBackground();
      this.sceneParts.forEach((obj) => obj.update(deltaTime, this.gameSpeed));
      this.checkCollisions();
      this.sceneParts.forEach((obj) => obj.render());

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

  /**
   * Инициализирует движок (метод-заглушка, будем расширять).
   */
  init() {
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
    this.isPaused = false;
    this.lastTime = performance.now();

    this.loop();
  }

  /**
   * Останавливает игру.
   */
  stop() {
    if (!this.animationId) return;

    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  /**
   * Приостанавливает игру.
   */
  pause() {
    if (!this.animationId) return;

    this.isPaused = true;
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  /**
   * Возобновляет игру.
   */
  resume() {
    if (!this.isPaused) return;

    this.isPaused = false;
    this.lastTime = performance.now();
    this.loop();
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
    this.sceneParts = [];
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
    const player = this.sceneParts.find((p) => p instanceof Player) as Player;

    if (!player) return;

    const others = this.sceneParts.filter((obj) => obj !== player);

    for (const obj of others) {
      for (const collision of obj.collisions) {
        if (collision.handled) continue;
        if (!this.isColliding(player.collision, collision)) continue;

        switch (obj.effectType) {
          case ObjectEffectType.Score:
            this.onScore();
            collision.handled = true;
            break;
          case ObjectEffectType.Damage:
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
   * Отрисовывает фон сцены.
   */
  private renderBackground() {
    this.ctx.fillStyle = 'lightblue';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
