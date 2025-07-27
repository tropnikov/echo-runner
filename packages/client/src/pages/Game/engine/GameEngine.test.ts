import { GameEngine } from './GameEngine';
import { GameObject } from './GameObject';
import { Player } from './Player';
import { Collision, ObjectEffectType } from './types';

// Наследник для тестов: дает доступ к protected-методам!
class TestableGameEngine extends GameEngine {
  public getGameObjectsForTest() {
    return this.__getGameObjectsForTest();
  }
  public runCheckCollisions() {
    return this.checkCollisions();
  }
}

class TestObject extends GameObject {
  effectType = ObjectEffectType.Score;
  update = jest.fn();
  render = jest.fn();
}

class TestCoin extends GameObject {
  effectType = ObjectEffectType.Score;
  update = jest.fn();
  render = jest.fn();
  constructor(ctx: CanvasRenderingContext2D, collision: Collision) {
    super(ctx);
    this._collisions = [collision];
  }
}

describe('GameEngine', () => {
  let engine: TestableGameEngine;
  let ctx: Partial<CanvasRenderingContext2D>;
  let onScore: jest.Mock;
  let onDamage: jest.Mock;

  beforeEach(() => {
    ctx = {
      canvas: { width: 100, height: 100 } as HTMLCanvasElement,
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
    };
    onScore = jest.fn();
    onDamage = jest.fn();
    engine = new TestableGameEngine({ ctx: ctx as CanvasRenderingContext2D, onScore, onDamage });
  });

  test('initGameObject добавляет объект', () => {
    const obj = new TestObject(ctx as CanvasRenderingContext2D);
    engine.initGameObject(obj);
    expect(engine.getGameObjectsForTest()).toContain(obj);
  });

  test('start запускает игровой цикл, если он не был включен', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    engine.start();
    expect(engine['animationId']).not.toBeNull();
    rafSpy.mockRestore();
  });

  test('start не запускает игровой цикл, если он уже был запущен', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    engine.start();
    engine.start();

    expect(rafSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalled();

    rafSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  test('removeAllSceneObjects очищает все объекты', () => {
    const obj1 = new TestObject(ctx as CanvasRenderingContext2D);
    const obj2 = new TestObject(ctx as CanvasRenderingContext2D);

    engine.initGameObject(obj1);
    engine.initGameObject(obj2);

    expect(engine.getGameObjectsForTest()).toHaveLength(2);

    engine.removeAllSceneObjects();

    expect(engine.getGameObjectsForTest()).toHaveLength(0);
  });

  test('корректно вызывает onScore при столкновении с объектом типа Score', () => {
    const collision: Collision = { x: 10, y: 10, width: 10, height: 10 };
    const player = new Player(ctx as CanvasRenderingContext2D);
    // 👇 только для теста! В рантайме так никто не будет делать
    (player as unknown as { _collision: Collision })._collision = collision;

    const coin = new TestCoin(ctx as CanvasRenderingContext2D, collision);

    engine.initGameObject(player).initGameObject(coin);

    engine.runCheckCollisions();

    expect(onScore).toHaveBeenCalled();
  });

  test('корректно вызывает onDamage при столкновении с объектом типа Damage', () => {
    const collision: Collision = { x: 10, y: 10, width: 10, height: 10 };
    const player = new Player(ctx as CanvasRenderingContext2D);
    (player as unknown as { _collision: Collision })._collision = collision;

    class TestObstacle extends GameObject {
      effectType = ObjectEffectType.Damage;
      update = jest.fn();
      render = jest.fn();
      constructor(ctx: CanvasRenderingContext2D, collision: Collision) {
        super(ctx);
        this._collisions = [collision];
      }
    }

    const obstacle = new TestObstacle(ctx as CanvasRenderingContext2D, collision);

    engine.initGameObject(player).initGameObject(obstacle);

    engine.runCheckCollisions();

    expect(onDamage).toHaveBeenCalled();
  });

  test('stop сбрасывает animationId в null', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42);

    engine.start();
    expect(engine['animationId']).toBe(42);

    engine.stop();
    expect(engine['animationId']).toBeNull();

    rafSpy.mockRestore();
  });
});
