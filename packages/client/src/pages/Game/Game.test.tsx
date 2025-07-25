import { fireEvent, render, screen } from '@testing-library/react';

import type { GameViewProps } from '@/components/GameView/types';

import Game from './Game';

jest.mock('@/components/GameView/GameView', () => ({
  __esModule: true,
  default: (props: GameViewProps) => {
    return (
      <div>
        <div data-testid="score">{props.score}</div>
        <div data-testid="damage">{props.damage}</div>
        <button data-testid="start" onClick={props.onStart}>
          Start
        </button>
        <button data-testid="pause" onClick={props.onPause}>
          Pause
        </button>
        <button data-testid="restart" onClick={props.onRestart}>
          Restart
        </button>
      </div>
    );
  },
}));

describe('Game', () => {
  test('рендерится с начальными значениями', () => {
    render(<Game maxDamage={5} />);

    expect(screen.getByTestId('score').textContent).toBe('0');
    expect(screen.getByTestId('damage').textContent).toBe('0');
  });

  test('нажимая старт, вызывается onStart', () => {
    render(<Game />);
    fireEvent.click(screen.getByTestId('start'));
  });

  test('рестарт сбрасывает score и damage в 0', () => {
    render(<Game />);
    fireEvent.click(screen.getByTestId('start'));

    fireEvent.click(screen.getByTestId('restart'));
    expect(screen.getByTestId('score').textContent).toBe('0');
    expect(screen.getByTestId('damage').textContent).toBe('0');
  });

  test('pause можно вызывать без ошибок', () => {
    render(<Game />);
    fireEvent.click(screen.getByTestId('pause'));
  });
});
