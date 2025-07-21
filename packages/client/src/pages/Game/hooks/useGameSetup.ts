import { useCallback, useEffect, useRef } from 'react';

import BackgroundImage from '../assets/bg.png';
import { Coin } from '../engine/Coin';
import { GameEngine } from '../engine/GameEngine';
import { Obstacle } from '../engine/Obstacle';
import { Player } from '../engine/Player';
import { initParallaxBackground } from '../helpers/initParallaxBackground';
import { GameSetupParams } from '../types';
import { useSprites } from './useSprites';

export function useGameSetup({ handleOnScore, handleOnDamage, playerSprites }: GameSetupParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const obstacleRef = useRef<Obstacle | null>(null);
  const playerRef = useRef<Player | null>(null);
  const coinRef = useRef<Coin | null>(null);

  const { sprite, isLoading: isSpritesLoading, error: spritesError } = useSprites(playerSprites);

  const initGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!engineRef.current) {
        engineRef.current = new GameEngine({
          ctx,
          onDamage: handleOnDamage,
          onScore: handleOnScore,
        });

        initParallaxBackground(engineRef.current, BackgroundImage, 0.5);
        resizeCanvas();
      }

      if (!playerRef.current && sprite) {
        playerRef.current = new Player(ctx, sprite);
      }

      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      // Инициализируем только если все объекты созданы
      if (playerRef.current && obstacleRef.current && coinRef.current) {
        engineRef.current
          .initGameObject(playerRef.current)
          .initGameObject(obstacleRef.current)
          .initGameObject(coinRef.current)
          .init();
      }
    },
    [handleOnDamage, handleOnScore, playerSprites, sprite],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const resetScene = useCallback(() => {
    if (!engineRef.current || !playerRef.current || !obstacleRef.current || !coinRef.current) {
      throw new Error('useGameSetup: Not all game entities initialized');
    }

    engineRef.current
      .removeAllSceneObjects()
      .clearAndRenderEmpty()
      .initGameObject(playerRef.current.reset())
      .initGameObject(obstacleRef.current.reset())
      .initGameObject(coinRef.current.reset())
      .init();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
  };
}
