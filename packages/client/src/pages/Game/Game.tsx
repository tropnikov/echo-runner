import { useCallback, useEffect, useMemo, useState } from 'react';

import GameView from '@/components/GameView/GameView';
import { teamName } from '@/constants/leaderboardStats';
import { TOUR_WATCHED } from '@/constants/tourWatched';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useAppSelector } from '@/redux/store';

import { withMeta } from '@/hocs/withMeta';

import PlayerJump from './assets/player/jump.png';
import PlayerRun from './assets/player/run.png';
import { getCanvasContext } from './helpers/getCanvasContext';
import { useGameSetup } from './hooks/useGameSetup';
import { useKeyboardControls } from './hooks/useKeyboardControls';

function Game({ maxDamage = 10 }: { maxDamage?: number }) {
  const [score, setScore] = useState(0);
  const [damage, setDamage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourSeen, setTourSeen] = useState(false);
  const [pausedByTour, setPausedByTour] = useState(false);

  const handleOnScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const { sendNewRating } = useLeaderboard();
  const user = useAppSelector((state) => state.auth.user);

  const handleOnDamage = useCallback(() => {
    setDamage((prev) => {
      const next = prev + 1;
      if (next >= maxDamage) {
        engineRef.current?.stop();
        setIsPaused(false);
        setScore((prevScore) => {
          sendNewRating({
            data: { score: prevScore, login: user?.login, user_id: user?.id },
            ratingFieldName: 'score',
            teamName,
          });
          return prevScore;
        });
        setIsStarted(false);
      }
      return next;
    });
  }, [maxDamage]);

  const handleStart = () => {
    if (isStarted) return;
    const ctx = getCanvasContext(canvasRef);
    if (!ctx) return;
    initGame(ctx);
    setIsStarted(true);
    setIsPaused(false);
  };

  const handleOnPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    pauseOrResumeGame();
  };

  const handleRestart = () => {
    setScore(0);
    setDamage(0);
    setIsPaused(false);

    resetScene();

    setIsStarted(true);
  };

  const { canvasRef, engineRef, playerRef, initGame, resetScene, stats } = useGameSetup({
    handleOnScore,
    handleOnDamage,
    playerSprites: useMemo(
      () => ({
        running: PlayerRun,
        jumping: PlayerJump,
      }),
      [],
    ),
  });

  const pauseOrResumeGame = useCallback(() => {
    setIsPaused((prev) => {
      const newState = !prev;
      if (engineRef.current) {
        newState ? engineRef.current.pause() : engineRef.current.resume();
      }
      return newState;
    });
  }, [engineRef]);

  useKeyboardControls({
    isActive: isStarted,
    onJump: () => playerRef.current?.jump(),
    onPause: pauseOrResumeGame,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TOUR_WATCHED);
      setTourSeen(saved === 'true');
    } catch (error) {
      console.warn('Failed to load tour state:', error);
    }
  }, []);

  // Автозапуск тура после старта игры
  // Ждем 2 кадра: первый для инициализации canvas, второй для стабилизации рендера
  useEffect(() => {
    if (!isStarted || tourSeen) return;

    let rafId: number;
    let frameCount = 0;

    const waitForCanvasReady = () => {
      frameCount++;

      // Ждем 2 кадра для полной инициализации canvas и первого рендера
      if (frameCount >= 2) {
        // Ставим игру на паузу только если она не была поставлена на паузу вручную
        if (!isPaused) {
          setIsPaused(true);
          engineRef.current?.pause();
          setPausedByTour(true);
        }
        setIsTourOpen(true);
        return;
      }

      rafId = requestAnimationFrame(waitForCanvasReady);
    };

    rafId = requestAnimationFrame(waitForCanvasReady);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isStarted, tourSeen, isPaused, engineRef]);

  const handleTourOpen = useCallback(() => {
    setIsTourOpen(true);
    if (isStarted && !isPaused) {
      setIsPaused(true);
      engineRef.current?.pause();
      setPausedByTour(true);
    } else {
      setPausedByTour(false);
    }
  }, [isStarted, isPaused, engineRef]);

  const handleTourClose = useCallback(() => {
    setIsTourOpen(false);

    try {
      localStorage.setItem(TOUR_WATCHED, 'true');
    } catch (error) {
      console.warn('Failed to save tour state:', error);
    }

    setTourSeen(true);

    // Возобновляем игру только если она была поставлена на паузу именно туром
    if (pausedByTour && isStarted && isPaused) {
      setIsPaused(false);
      engineRef.current?.resume();
    }

    setPausedByTour(false);
  }, [pausedByTour, isStarted, isPaused, engineRef]);

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
      stats={stats}
      tourOpen={isTourOpen}
      onTourClose={handleTourClose}
      onTourOpen={handleTourOpen}
    />
  );
}

export default withMeta(Game, {
  title: 'Игра',
  description:
    'Играйте в Echo Runner! Управляйте персонажем, преодолевайте препятствия, набирайте очки и устанавливайте новые рекорды.',
  keywords: 'игра, играть, echo runner, платформер, очки, рекорды, геймплей',
  url: '/game',
  noIndex: true,
});
