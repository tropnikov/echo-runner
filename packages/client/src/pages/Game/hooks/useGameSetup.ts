import { useCallback, useEffect, useRef } from 'react';

import { usePerformanceStats } from '@/hooks/usePerformanceStats';

import BackgroundImage from '../assets/bg.png';
import { Coin } from '../engine/Coin';
import { GameEngine } from '../engine/GameEngine';
import { Obstacle } from '../engine/Obstacle';
import { Player } from '../engine/Player';
import { initParallaxBackground } from '../helpers/initParallaxBackground';
import { GameSetupParams } from '../types';
import { usePlayerSprites } from './usePlayerSprites';

export function useGameSetup({ handleOnScore, handleOnDamage, playerSprites }: GameSetupParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const obstacleRef = useRef<Obstacle | null>(null);
  const playerRef = useRef<Player | null>(null);
  const coinRef = useRef<Coin | null>(null);

  // перф-метрики
  const { beginFrame, endFrame, stats, reset } = usePerformanceStats();
  // актуальные ссылки, чтобы не перевешивать хуки
  const beginRef = useRef(beginFrame);
  const endRef = useRef(endFrame);
  useEffect(() => {
    beginRef.current = beginFrame;
  }, [beginFrame]);
  useEffect(() => {
    endRef.current = endFrame;
  }, [endFrame]);

  const { sprite, isLoading: isSpritesLoading, error: spritesError } = usePlayerSprites(playerSprites);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const initGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // 1) создаём движок один раз
      if (engineRef.current === null) {
        const e = new GameEngine({
          ctx,
          onDamage: handleOnDamage,
          onScore: handleOnScore,
        });

        // вешаем хуки кадров (один раз), вызываем актуальные begin/end через ref
        e.setFrameHooks({
          before: () => {
            beginRef.current();
          },
          after: () => {
            endRef.current();
          },
        });

        initParallaxBackground(e, BackgroundImage, 0.5);
        resizeCanvas();

        engineRef.current = e;
      }

      // 2) локальная ссылка, без non-null
      const engine = engineRef.current;
      if (!engine) return;

      // 3) создаём сущности
      if (!playerRef.current && sprite) {
        playerRef.current = new Player(ctx, sprite);
      }
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      // 4) добавляем в сцену, когда все готовы
      if (playerRef.current && obstacleRef.current && coinRef.current) {
        engine
          .initGameObject(playerRef.current)
          .initGameObject(obstacleRef.current)
          .initGameObject(coinRef.current)
          .init()
          .start();
      }

      console.log('Sprite loaded:', sprite);

      engine.start();
    },
    [handleOnDamage, handleOnScore, sprite, resizeCanvas],
  );

  const resetScene = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !playerRef.current || !obstacleRef.current || !coinRef.current) return;

    engine
      .removeAllSceneObjects()
      .clearAndRenderEmpty()
      .initGameObject(playerRef.current.reset())
      .initGameObject(obstacleRef.current.reset())
      .initGameObject(coinRef.current.reset())
      .init();

    reset(); // обнуляем метрики
  }, [reset]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      // аккуратно останавливаем движок при размонтировании
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, [resizeCanvas]);

  return {
    canvasRef,
    engineRef,
    obstacleRef,
    playerRef,
    coinRef,
    initGame,
    resetScene,
    isSpritesLoading,
    spritesError,
    stats, // ← можно пробрасывать в StatsOverlay
  };
}
