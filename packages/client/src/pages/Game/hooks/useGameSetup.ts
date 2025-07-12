import { useCallback, useEffect, useRef } from 'react';

import { Coin } from '../engine/Coin';
import { GameEngine } from '../engine/GameEngine';
import { Obstacle } from '../engine/Obstacle';
import { Player } from '../engine/Player';

export function useGameSetup({
  handleOnScore,
  handleOnDamage,
}: {
  handleOnScore: () => void;
  handleOnDamage: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const obstacleRef = useRef<Obstacle | null>(null);
  const playerRef = useRef<Player | null>(null);
  const coinRef = useRef<Coin | null>(null);

  const initGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!engineRef.current) {
        engineRef.current = new GameEngine({
          ctx,
          onDamage: handleOnDamage,
          onScore: handleOnScore,
        });

        resizeCanvas();
      }

      if (!playerRef.current) playerRef.current = new Player(ctx);
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      engineRef.current
        .initGameObject(playerRef.current)
        .initGameObject(obstacleRef.current)
        .initGameObject(coinRef.current)
        .init();
    },
    [handleOnDamage, handleOnScore],
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
  };
}
