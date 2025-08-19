import { MouseEvent, useState } from 'react';

import { Button, theme } from 'antd';
import {
  DashboardOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import { PerformancePanel } from '@/components/PerformancePanel/PerformancePanel';
import StartGameView from '@/components/StartGameView/StartGameView';
import { useFullscreen } from '@/hooks/useFullscreen';

import { GameViewProps } from './types';

import styles from './GameView.module.css';

const { useToken } = theme;

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
  stats,
}: GameViewProps) {
  const { elementRef, isFullscreen, toggleFullscreen } = useFullscreen();
  const [isPerformancePanelVisible, setPerformancePanelVisible] = useState(false);

  const {
    token: { colorBgContainer },
  } = useToken();

  function handleFullscreenButtonClick(e: MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget && e.currentTarget instanceof HTMLButtonElement) {
      e.currentTarget.blur();
    }
    toggleFullscreen();
  }

  return (
    <section ref={elementRef} className={styles.gameViewContainer}>
      <div style={{ backgroundColor: colorBgContainer }} className={styles.gameViewContainer}>
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
          </div>

          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
      </div>

      {isPerformancePanelVisible && stats && <PerformancePanel stats={stats} />}

      <div className={styles.controlButtons}>
        <Button
          type="primary"
          shape="circle"
          icon={<DashboardOutlined />}
          className={styles.perfPanelButton}
          onClick={() => setPerformancePanelVisible((prev) => !prev)}
          aria-label={
            isPerformancePanelVisible ? 'Скрыть панель производительности' : 'Показать панель производительности'
          }
        />
        <Button
          type="primary"
          shape="circle"
          icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          className={styles.fullScreenButton}
          onClick={handleFullscreenButtonClick}
          aria-label={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
        />
      </div>
    </section>
  );
}

export default GameView;
