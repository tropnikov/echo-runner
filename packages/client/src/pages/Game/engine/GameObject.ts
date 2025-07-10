import { Collision, GenerateCollisionsParams, ObjectEffectType } from './types';

/**
 * Абстрактный базовый класс для игровых объектов на Canvas.
 *
 * Используется для создания объектов с общей логикой отрисовки и обновления.
 * Потомки должны реализовать методы `update()` и `render()`.
 */

export abstract class GameObject {
  protected readonly ctx: CanvasRenderingContext2D;

  protected _collisions: Collision[] = [];

  protected nextSpawnX: number;

  abstract effectType: ObjectEffectType;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.nextSpawnX = ctx.canvas.width;
  }

  get collisions() {
    return this._collisions;
  }

  /**
   * Генерирует коллизии.
   */
  protected createCollisions({ minDistanceX, maxDistanceX, callback }: GenerateCollisionsParams) {
    callback(this.nextSpawnX);
    const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
    this.nextSpawnX += distance;
  }

  /**
   * Проверяет, нужно ли создавать новый объект.
   */
  protected shouldSpawnNewObject({
    last,
    minDistanceX,
    canvasRight,
  }: {
    last: Collision;
    minDistanceX: number;
    canvasRight: number;
  }): boolean {
    // Если нет коллизий, значит нужно создать первый объект
    if (!last) {
      return true;
    }

    // Если последний объект ушёл полностью, создаём новый справа
    const lastRight = last.x + last.width;

    if (lastRight < 0) {
      return true;
    }

    // Последний объект ещё виден — ничего не делаем
    if (last.x < canvasRight) {
      return false;
    }

    // Проверяем расстояние до nextSpawnX
    const distanceToNext = this.nextSpawnX - last.x;

    return distanceToNext >= minDistanceX;
  }

  /**
   * Обновляет коллизии.
   */
  protected updateCollisions({ minDistanceX, maxDistanceX, callback }: GenerateCollisionsParams) {
    const last = this._collisions[this._collisions.length - 1];
    const canvasRight = this.ctx.canvas.width;

    if (!last || this.shouldSpawnNewObject({ last, canvasRight, minDistanceX })) {
      const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
      this.nextSpawnX = (last ? last.x : canvasRight) + distance;
      callback(this.nextSpawnX);
    }
  }

  /**
   * Добавляет коллизию.
   */
  protected addCollision(collision: Collision) {
    this._collisions.push(collision);
  }

  /**
   * Преобразует игровую координату Y в координату Canvas (инвертирует ось Y).
   */
  protected toCanvasCoords(collision: Collision): Collision {
    return {
      ...collision,
      y: this.ctx.canvas.height - (collision.y + collision.height),
    };
  }

  /**
   * Сбрасывает состояние объекта.
   */
  reset() {
    this._collisions = [];
    this.nextSpawnX = this.ctx.canvas.width;
    return this;
  }

  /**
   * Обновление состояния объекта.
   */
  abstract update(delta: number, gameSpeed: number): void;

  /**
   * Рендеринг объекта.
   */
  abstract render(): void;
}
