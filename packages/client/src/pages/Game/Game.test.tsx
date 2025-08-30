import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { GameViewProps } from '@/components/GameView/types';

import Game from './Game';

// Мокаем fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
  } as Response),
) as jest.Mock;

// Мокаем getCanvasContext
jest.mock('./helpers/getCanvasContext', () => ({
  getCanvasContext: (canvasRef: React.RefObject<HTMLCanvasElement>) => canvasRef.current?.getContext('2d') ?? null,
}));

// Мокаем useGameSetup — КЛЮЧЕВОЙ МОК
jest.mock('./hooks/useGameSetup', () => ({
  useGameSetup: jest.fn(() => ({
    canvasRef: { current: document.createElement('canvas') },
    engineRef: {
      current: { pause: jest.fn(), resume: jest.fn(), stop: jest.fn() },
    },
    playerRef: { current: { jump: jest.fn() } },
    initGame: jest.fn(),
    resetScene: jest.fn(),
    stats: {},
  })),
}));

// Мокаем useLeaderboard
jest.mock('@/hooks/useLeaderboard', () => ({
  useLeaderboard: () => ({
    sendNewRating: jest.fn(),
  }),
}));

// Мокаем Helmet (из dev)
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Мокаем react-redux (из dev)
jest.mock('react-redux', () => ({
  useSelector: Object.assign(jest.fn().mockReturnValue({}), {
    withTypes: () => jest.fn(),
  }),
}));

// Мокаем useAppSelector
jest.mock('@/redux/store', () => ({
  useAppSelector: jest.fn((selector) =>
    selector({
      auth: { user: { login: 'test-user', id: 123 } },
    }),
  ),
}));

// Мокаем GameView
jest.mock('@/components/GameView/GameView', () => ({
  __esModule: true,
  default: (props: GameViewProps) => (
    <div>
      {!props.isStarted && <div>Игра не начата</div>}
      {props.isStarted && <div>Игра запущена</div>}
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
  ),
}));

// Очищаем моки
beforeEach(() => {
  jest.clearAllMocks();
});

// Хелпер для рендера
const renderGame = (props?: { maxDamage?: number }) => {
  return render(<Game {...props} />);
};

describe('Game', () => {
  test('рендерится с начальными значениями', () => {
    renderGame({ maxDamage: 5 });
    expect(screen.getByTestId('score')).toHaveTextContent('0');
    expect(screen.getByTestId('damage')).toHaveTextContent('0');
  });

  test('игра начинается после клика по Start', async () => {
    renderGame();
    expect(screen.getByText('Игра не начата')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('start'));

    await waitFor(() => {
      expect(screen.queryByText('Игра не начата')).not.toBeInTheDocument();
      expect(screen.getByText('Игра запущена')).toBeInTheDocument();
    });
  });

  test('рестарт сбрасывает score и damage в 0', () => {
    renderGame();
    fireEvent.click(screen.getByTestId('start'));
    fireEvent.click(screen.getByTestId('restart'));
    expect(screen.getByTestId('score')).toHaveTextContent('0');
    expect(screen.getByTestId('damage')).toHaveTextContent('0');
  });

  test('pause можно вызывать без ошибок', () => {
    renderGame();
    fireEvent.click(screen.getByTestId('pause'));
  });
});
