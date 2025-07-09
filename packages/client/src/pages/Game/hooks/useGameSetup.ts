import { useCallback, useEffect, useRef } from 'react';

import { Coin } from '../engine/Coin';
import { GameEngine } from '../engine/GameEngine';
import { Obstacle } from '../engine/Obstacle';
import { Player } from '../engine/Player';

export function useGameSetup({
  isStarted = false,
  handleOnScore,
  handleOnDamage,
}: {
  isStarted: boolean;
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
      }

      if (!playerRef.current) playerRef.current = new Player(ctx);
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx);
      if (!coinRef.current) coinRef.current = new Coin(ctx);

      engineRef.current
        .initSceneObject(playerRef.current)
        .initSceneObject(obstacleRef.current)
        .initSceneObject(coinRef.current)
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
    if (engineRef.current && playerRef.current && obstacleRef.current && coinRef.current) {
      engineRef.current
        .removeAllSceneObjects()
        .clearAndRenderEmpty()
        .initSceneObject(playerRef.current.reset())
        .initSceneObject(obstacleRef.current.reset())
        .initSceneObject(coinRef.current.reset())
        .init();
    }
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isStarted, resizeCanvas]);

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
