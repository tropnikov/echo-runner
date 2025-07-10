import { Button } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { GameViewProps } from './types';

import styles from './GameView.module.css';

function GameView({
  canvasRef,
  score,
  damage,
  maxDamage,
  isPaused,
  isStarted,
  onStart,
  onRestart,
  onPause,
}: GameViewProps) {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        {!isStarted ? (
          <>
            <span>Игра не начата</span>
            <Button type="primary" icon={<PlayCircleOutlined />} onClick={onStart}>
              Старт игры
            </Button>
          </>
        ) : damage >= maxDamage ? (
          <>
            <span>Игра окончена, вы набрали очков: {score}</span>
            <Button type="primary" icon={<PlayCircleOutlined />} onClick={onRestart}>
              Начать заново
            </Button>
          </>
        ) : (
          <>
            Очки: {score} / Урон: {damage}
            <div className={styles.menu}>
              <Button
                type="primary"
                icon={isPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                onClick={onPause}>
                {isPaused ? 'Продолжить' : 'Пауза'}
              </Button>
              <span>
                или нажмите <strong>P</strong> для паузы
              </span>
            </div>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default GameView;
