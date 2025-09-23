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
  const startedRef = useRef(false);

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

      if (!playerRef.current && sprite) playerRef.current = new Player(ctx, sprite);
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      if (playerRef.current && obstacleRef.current && coinRef.current) {
        engine
          .initGameObject(playerRef.current)
          .initGameObject(obstacleRef.current)
          .initGameObject(coinRef.current)
          .init();

        if (!startedRef.current) {
          engine.start();
          startedRef.current = true;
        }
      }
    },
    [handleOnDamage, handleOnScore, sprite, resizeCanvas, beginFrame, endFrame],
  );

  const resetScene = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !playerRef.current || !obstacleRef.current || !coinRef.current) return;

    engine.stop();
    startedRef.current = false;

    engine
      .removeAllSceneObjects()
      .clearAndRenderEmpty()
      .initGameObject(playerRef.current.reset())
      .initGameObject(obstacleRef.current.reset())
      .initGameObject(coinRef.current.reset())
      .init();

    engine.start();
    startedRef.current = true;

    reset();
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
