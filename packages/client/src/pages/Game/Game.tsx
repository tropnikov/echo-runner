import { useCallback, useState } from 'react';

import GameView from '@/components/GameView/GameView';

import { useGameSetup } from './hooks/useGameSetup';
import { useKeyboardControls } from './hooks/useKeyboardControls';

function Game({ maxDamage = 10 }: { maxDamage?: number }) {
  const [score, setScore] = useState(0);
  const [damage, setDamage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleOnScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const handleOnDamage = useCallback(() => {
    setDamage((prev) => {
      const next = prev + 1;

      if (next >= maxDamage) {
        engineRef.current?.stop();
        setIsPaused(false);
      }
      return next;
    });
  }, [maxDamage]);

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();

    setIsStarted(true);

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    initGame(ctx);
    engineRef.current?.start();
  };

  const handleOnPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    pauseGame();
  };

  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();

    setScore(0);
    setDamage(0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resetScene();

    engineRef.current?.start();
  };

  const pauseGame = useCallback(() => {
    setIsPaused((prev) => {
      const newState = !prev;

      if (engineRef.current) {
        newState ? engineRef.current.pause() : engineRef.current.resume();
      }

      return newState;
    });
  }, []);

  useKeyboardControls({
    isActive: isStarted,
    onJump: () => playerRef.current?.jump(),
    onPause: pauseGame,
  });

  const { canvasRef, engineRef, playerRef, initGame, resetScene } = useGameSetup({
    isStarted,
    handleOnScore,
    handleOnDamage,
  });

  return (
    <GameView
      canvasRef={canvasRef}
      score={score}
      damage={damage}
      maxDamage={maxDamage}
      isPaused={isPaused}
      isStarted={isStarted}
      onStart={handleStart}
      onRestart={handleRestart}
      onPause={handleOnPause}
    />
  );
}

export default Game;
