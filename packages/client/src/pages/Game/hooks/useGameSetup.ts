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

  // флаг «движок уже запущен» — только на уровне хука
  const startedRef = useRef(false);

  // перф-метрики (fps по dt между begin'ами)
  const { beginFrame, endFrame, stats, reset } = usePerformanceStats();

  const { sprite, isLoading: isSpritesLoading, error: spritesError } = usePlayerSprites(playerSprites);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const initGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (engineRef.current === null) {
        const e = new GameEngine({
          ctx,
          onDamage: handleOnDamage,
          onScore: handleOnScore,
        });

        // привязываем перф-колбэки (без ts), обновим их ещё и эффектом ниже
        e.setFrameHooks({
          before: beginFrame,
          after: endFrame,
        });

        initParallaxBackground(e, BackgroundImage, 0.5);
        resizeCanvas();

        engineRef.current = e;
      }

      const engine = engineRef.current;
      if (!engine) return;

      // создаём сущности
      if (!playerRef.current && sprite) playerRef.current = new Player(ctx, sprite);
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      // добавляем в сцену, когда все готовы
      if (playerRef.current && obstacleRef.current && coinRef.current) {
        engine
          .initGameObject(playerRef.current)
          .initGameObject(obstacleRef.current)
          .initGameObject(coinRef.current)
          .init();

        // безопасный запуск: не даём запуститься второй раз
        if (!startedRef.current) {
          engine.start();
          startedRef.current = true;
        }
      }
    },
    [handleOnDamage, handleOnScore, sprite, resizeCanvas, beginFrame, endFrame],
  );

  // если колбэки пересоздались, обновим их в движке
  useEffect(() => {
    engineRef.current?.setFrameHooks({
      before: beginFrame,
      after: endFrame,
    });
  }, [beginFrame, endFrame]);

  const resetScene = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !playerRef.current || !obstacleRef.current || !coinRef.current) return;

    // стопаем обязательно, чтобы не было двух циклов
    engine.stop();
    startedRef.current = false;

    engine
      .removeAllSceneObjects()
      .clearAndRenderEmpty()
      .initGameObject(playerRef.current.reset())
      .initGameObject(obstacleRef.current.reset())
      .initGameObject(coinRef.current.reset())
      .init();

    // если хотим продолжить игру сразу — перезапускаем один цикл
    engine.start();
    startedRef.current = true;

    reset(); // обнуляем метрики
  }, [reset]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (engineRef.current) {
        engineRef.current.stop();
      }
      startedRef.current = false;
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
    stats,
  };
}
