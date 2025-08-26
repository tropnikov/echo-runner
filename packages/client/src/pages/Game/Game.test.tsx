import { fireEvent, render, screen } from '@testing-library/react';

import type { GameViewProps } from '@/components/GameView/types';

import Game from './Game';

jest.mock('@/components/GameView/GameView', () => ({
  __esModule: true,
  default: (props: GameViewProps) => {
    return (
      <div>
        {!props.isStarted && <div>Игра не начата</div>}
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

jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('react-redux', () => ({
  useSelector: Object.assign(jest.fn().mockReturnValue({}), {
    withTypes: () => jest.fn(),
  }),
  useDispatch: Object.assign(jest.fn(), {
    withTypes: () => jest.fn(),
  }),
  useStore: Object.assign(
    jest.fn().mockReturnValue({
      getState: () => ({}),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    }),
    {
      withTypes: () => jest.fn(),
    },
  ),
}));

const renderGame = (props?: { maxDamage?: number }) => {
  return render(<Game {...props} />);
};

describe('Game', () => {
  test('рендерится с начальными значениями', () => {
    renderGame({ maxDamage: 5 });

    expect(screen.getByTestId('score').textContent).toBe('0');
    expect(screen.getByTestId('damage').textContent).toBe('0');
  });

  test('игра начинается после клика по Start', () => {
    renderGame();
    expect(screen.getByText('Игра не начата')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('start'));
    // "Игра не начата" должен исчезнуть
    expect(screen.queryByText('Игра не начата')).not.toBeInTheDocument();
  });

  test('рестарт сбрасывает score и damage в 0', () => {
    renderGame();
    fireEvent.click(screen.getByTestId('start'));

    fireEvent.click(screen.getByTestId('restart'));
    expect(screen.getByTestId('score').textContent).toBe('0');
    expect(screen.getByTestId('damage').textContent).toBe('0');
  });

  test('pause можно вызывать без ошибок', () => {
    renderGame();
    fireEvent.click(screen.getByTestId('pause'));
  });
});
