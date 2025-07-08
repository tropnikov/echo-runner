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

  protected nextX: number;

  abstract effectType: ObjectEffectType;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.nextX = ctx.canvas.width;
  }

  get collisions() {
    return this._collisions;
  }

  /**
   * Генерирует коллизии.
   */
  protected createCollisions({ minDistanceX, maxDistanceX, callback }: GenerateCollisionsParams) {
    callback(this.nextX);
    const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
    this.nextX += distance;
  }

  /**
   * Обновляет коллизии.
   */
  protected updateCollisions({ minDistanceX, maxDistanceX, callback }: GenerateCollisionsParams) {
    // Удаляем объекты за левым краем
    this._collisions = this._collisions.filter((collision) => collision.x + collision.width > 0);

    const last = this._collisions[this._collisions.length - 1];
    const canvasRight = this.ctx.canvas.width;

    if (!last) {
      // Первый объект: справа за канвасом с рандомным расстоянием
      const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
      this.nextX = canvasRight + distance;
      callback(this.nextX);
      return;
    }

    const lastRight = last.x + last.width;

    if (lastRight < 0) {
      // Если последний объект ушёл полностью, генерируем новый справа
      const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
      this.nextX = canvasRight + distance;
      callback(this.nextX);
      return;
    }

    if (last.x < canvasRight) {
      // Последний объект ещё виден — ничего не делаем
      return;
    }

    // Проверяем расстояние до nextX
    const distanceToNext = this.nextX - last.x;

    if (distanceToNext >= minDistanceX) {
      const distance = minDistanceX + Math.random() * (maxDistanceX - minDistanceX);
      this.nextX = last.x + distance;
      callback(this.nextX);
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
    this.nextX = this.ctx.canvas.width;
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
