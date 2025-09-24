import { MouseEvent, useRef, useState } from 'react';

import { Button, Tour } from 'antd';
import {
  DashboardOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import { PerformancePanel } from '@/components/PerformancePanel/PerformancePanel';
import StartGameView from '@/components/StartGameView/StartGameView';
import { useFullscreen } from '@/hooks/useFullscreen';

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
  stats,
  tourOpen,
  onTourClose,
  onTourOpen,
}: GameViewProps) {
  const { elementRef, isFullscreen, toggleFullscreen } = useFullscreen();
  const [isPerformancePanelVisible, setPerformancePanelVisible] = useState(false);

  const pauseBtnRef = useRef<HTMLButtonElement | null>(null);
  const helpBtnRef = useRef<HTMLButtonElement | null>(null);
  const perfBtnRef = useRef<HTMLButtonElement | null>(null);
  const fsBtnRef = useRef<HTMLButtonElement | null>(null);

  function handleFullscreenButtonClick(e: MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget && e.currentTarget instanceof HTMLButtonElement) {
      e.currentTarget.blur();
    }
    toggleFullscreen();
  }

  const handleHelpClick = () => {
    onTourOpen();
  };

  return (
    <section ref={elementRef} className={styles.gameViewContainer}>
      <div className={styles.gameViewContainer}>
        {!isStarted && damage < maxDamage && (
          <StartGameView text="Игра не начата" ButtonIcon={PlayCircleOutlined} onButtonClick={onStart} />
        )}

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
                onClick={onPause}
                ref={pauseBtnRef}>
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
        {isStarted && (
          <Button
            type="primary"
            shape="circle"
            icon={<QuestionCircleOutlined />}
            onClick={handleHelpClick}
            aria-label="Показать обучение"
            ref={helpBtnRef}
          />
        )}
        <Button
          type="primary"
          shape="circle"
          icon={<DashboardOutlined />}
          ref={perfBtnRef}
          onClick={() => setPerformancePanelVisible((prev) => !prev)}
          aria-label={
            isPerformancePanelVisible ? 'Скрыть панель производительности' : 'Показать панель производительности'
          }
        />
        <Button
          type="primary"
          shape="circle"
          icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          ref={fsBtnRef}
          onClick={handleFullscreenButtonClick}
          aria-label={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
        />
      </div>

      <Tour
        open={tourOpen}
        onClose={onTourClose}
        steps={[
          {
            title: 'А как играть?',
            description:
              'Персонаж всегда куда-то бежит. Зарабатывайте очки, собирая монетки, и перепрыгивайте ящики, чтобы не получать урон. Когда урон станет невыносимым (10), игра закончится. Прыгать можно по пробелу, а дважды прыгать по дважды пробелу',
            target: canvasRef.current ? () => canvasRef.current as unknown as HTMLElement : null,
            placement: 'center',
          },
          {
            title: 'Управление',
            description: 'Для паузы нажмите эту кнопку или клавишу P.',
            target: pauseBtnRef.current ? () => pauseBtnRef.current as unknown as HTMLElement : null,
            placement: 'bottom',
          },
          {
            title: 'Обучение',
            description: 'Нажмите на "?", чтобы снова открыть это обучение.',
            target: helpBtnRef.current ? () => helpBtnRef.current as unknown as HTMLElement : null,
            placement: 'left',
          },
          {
            title: 'Производительность',
            description: 'Откройте панель производительности, чтобы посмотреть FPS и другие параметры.',
            target: perfBtnRef.current ? () => perfBtnRef.current as unknown as HTMLElement : null,
            placement: 'left',
          },
          {
            title: 'Во весь экран',
            description: 'Игру можно развернуть на весь экран',
            target: fsBtnRef.current ? () => fsBtnRef.current as unknown as HTMLElement : null,
            placement: 'left',
          },
          {
            title: 'Лидерборд',
            description: 'Ваш лучший результат попадёт в таблицу лидеров. Ссылка — в шапке.',
            target: () => document.querySelector('a[href$="leaderboard"]') as unknown as HTMLElement,
            placement: 'bottom',
          },
        ]}
      />
    </section>
  );
}

export default GameView;
