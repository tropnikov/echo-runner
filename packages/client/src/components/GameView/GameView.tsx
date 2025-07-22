import { Button } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import StartGameView from '@/components/StartGameView/StartGameView';

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
    <>
      {!isStarted && <StartGameView text="Игра не начата" ButtonIcon={PlayCircleOutlined} onButtonClick={onStart} />}
      {damage >= maxDamage && (
        <StartGameView
          text={`Игра окончена, вы набрали очков: ${score}`}
          ButtonIcon={ReloadOutlined}
          onButtonClick={onRestart}
        />
      )}
      <div
        className={styles.gameContainer}
        style={{
          display: !isStarted || damage >= maxDamage ? 'none' : 'block',
        }}>
        <div className={styles.header}>
          Очки: {score} / Урон: {damage}
          <div className={styles.menu}>
            <Button type="primary" icon={isPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />} onClick={onPause}>
              {isPaused ? 'Продолжить' : 'Пауза'}
            </Button>
            <span>
              или нажмите <strong>P</strong> для паузы
            </span>
          </div>
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </>
  );
}

export default GameView;
