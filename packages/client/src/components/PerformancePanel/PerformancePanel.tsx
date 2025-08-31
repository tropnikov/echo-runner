import { Stats } from '@/hooks/usePerformanceStats';

import styles from './PerformancePanel.module.css';

type PerformancePanelProps = {
  stats: Stats;
};

export function PerformancePanel({ stats }: PerformancePanelProps) {
  return (
    <div className={styles.panel}>
      <div>
        <b>FPS:</b> {stats.fps}
      </div>
      <div>
        <b>avg:</b> {stats.avg.toFixed(1)} ms
      </div>
      <div>
        <b>p99:</b> {stats.p99.toFixed(1)} ms
      </div>
      <div>
        <b>drops:</b> {stats.drops}
      </div>
      <div>
        <b>long:</b> {stats.long}
      </div>
      {typeof stats.mem === 'number' && (
        <div>
          <b>mem:</b> {stats.mem.toFixed(0)} MB
        </div>
      )}
    </div>
  );
}

export default PerformancePanel;
