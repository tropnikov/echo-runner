export interface LeaderboardRecord {
  key: number;
  player: string;
  score: number;
}

export interface LeaderboardTableProps {
  data: LeaderboardRecord[];
}

export interface HeroBlockProps {
  onUpdate: () => void;
}
