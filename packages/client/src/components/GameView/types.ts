import type { Stats } from '@/hooks/usePerformanceStats';

export type GameViewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  score: number;
  damage: number;
  maxDamage: number;
  isPaused: boolean;
  isStarted: boolean;
  onStart: () => void;
  onRestart: () => void;
  onPause: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMute: (status: boolean) => void;
  stats?: Stats;
  tourOpen: boolean;
  onTourClose: () => void;
  onTourOpen: () => void;
};
