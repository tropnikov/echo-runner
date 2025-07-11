export type GameViewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  score: number;
  damage: number;
  maxDamage: number;
  isPaused: boolean;
  isStarted: boolean;
  onStart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRestart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPause: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
