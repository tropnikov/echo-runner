import { GameEngine } from './GameEngine';
import { GameObject } from './GameObject';
import { Player } from './Player';
import { Collision, ObjectEffectType } from './types';

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

// Хелпер для создания игрока с кастомной коллизией
function createTestPlayer(ctx: CanvasRenderingContext2D, collision: Collision): Player {
  const dummySprite = document.createElement('canvas');
  const player = new Player(ctx, dummySprite);
  (player as unknown as { _collision: Collision })._collision = collision;
  return player;
}

// Мокаем requestAnimationFrame так, чтобы тик сразу вызывался
function mockRAF() {
  return jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback): number => {
    cb(performance.now() + 16);
    return 1;
  });
}

describe('GameEngine', () => {
  let engine: GameEngine;
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
    engine = new GameEngine({ ctx: ctx as CanvasRenderingContext2D, onScore, onDamage });
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

  test('после removeAllSceneObjects столкновений не происходит', () => {
    const collision: Collision = { x: 10, y: 10, width: 10, height: 10 };
    const player = createTestPlayer(ctx as CanvasRenderingContext2D, collision);
    const coin = new TestCoin(ctx as CanvasRenderingContext2D, collision);

    engine.initGameObject(player).initGameObject(coin);
    engine.removeAllSceneObjects();

    engine.initGameObject(player).initGameObject(coin);
    expect(onScore).not.toHaveBeenCalled();
    expect(onDamage).not.toHaveBeenCalled();
  });

  // test('вызывает onScore при столкновении', () => {
  //   const collision: Collision = { x: 10, y: 0, width: 10, height: 10 }; // y: 0!
  //   const player = createTestPlayer(ctx as CanvasRenderingContext2D, collision);
  //   player.update = jest.fn(); // фиксируем позицию

  //   const coin = new TestCoin(ctx as CanvasRenderingContext2D, collision);

  //   engine.initGameObject(player).initGameObject(coin);

  //   const origUpdate = player.update;
  //   player.update = function () {
  //     console.log('update called!');
  //     // ничего не делаем!
  //   };

  //   const rafSpy = mockRAF();
  //   engine.start();
  //   expect(onScore).toHaveBeenCalled();
  //   rafSpy.mockRestore();
  // });

  // test('корректно вызывает onDamage при столкновении с объектом типа Damage', () => {
  //   const collision: Collision = { x: 10, y: 10, width: 10, height: 10 };
  //   const player = createTestPlayer(ctx as CanvasRenderingContext2D, collision);

  //   class TestObstacle extends GameObject {
  //     effectType = ObjectEffectType.Damage;
  //     update = jest.fn();
  //     render = jest.fn();
  //     constructor(ctx: CanvasRenderingContext2D, collision: Collision) {
  //       super(ctx);
  //       this._collisions = [collision];
  //     }
  //   }
  //   const obstacle = new TestObstacle(ctx as CanvasRenderingContext2D, collision);

  //   engine.initGameObject(player).initGameObject(obstacle);

  //   const rafSpy = mockRAF();
  //   engine.start();
  //   expect(onDamage).toHaveBeenCalled();
  //   rafSpy.mockRestore();
  // });

  test('stop сбрасывает animationId в null', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42);

    engine.start();
    expect(engine['animationId']).toBe(42);

    engine.stop();
    expect(engine['animationId']).toBeNull();

    rafSpy.mockRestore();
  });
});
