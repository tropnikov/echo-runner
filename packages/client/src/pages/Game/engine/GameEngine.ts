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

  private gameObjects: GameObject[] = [];

  private animationId: number | null = null;

  private gameSpeed = config.initialSpeed;

  private lastTime = 0;

  private speedTimer = 0;

  constructor(props: { ctx: CanvasRenderingContext2D; onDamage: () => void; onScore: () => void }) {
    this.onDamage = props.onDamage;
    this.onScore = props.onScore;
    this.ctx = props.ctx;
  }

  /**
   * Добавляет объект сцены в список для обновления и рендеринга.
   */
  initGameObject(gameObjects: GameObject) {
    this.gameObjects.push(gameObjects);
    return this;
  }

  /**
   * Основной цикл игрового движка.
   */
  private loop() {
    this.lastTime = performance.now();

    const sceneTimer = (now: number) => {
      if (!this.animationId) return;

      const deltaTime = (now - this.lastTime) / 1000;
      this.lastTime = now;

      this.updateGameSpeed(deltaTime);
      this.clearScene();

      this.renderBackground();
      this.gameObjects.forEach((obj) => obj.update(deltaTime, this.gameSpeed));
      this.checkCollisions();
      this.gameObjects.forEach((obj) => obj.render());

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
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  /**
   * Возобновляет игру.
   */
  resume() {
    if (this.animationId) return;
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
    this.gameObjects = [];
    return this;
  }

  /**
   * Проверяет пересечение двух коллизий.
   */
  private isColliding(a: Collision, b: Collision): boolean {
    return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
  }

  /**
   * Проверяет столкновения. Protected - для тестов
   */
  protected checkCollisions() {
    const player = this.gameObjects.find((p) => p instanceof Player) as Player;

    if (!player) return;

    const others = this.gameObjects.filter((obj) => obj !== player);

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

  /**
   * Только для тестов!
   * Не используйте в боевом коде.
   */
  protected __getGameObjectsForTest() {
    return this.gameObjects;
  }
}
