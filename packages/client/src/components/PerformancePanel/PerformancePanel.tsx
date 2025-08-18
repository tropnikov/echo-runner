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
        <b>avg:</b> {stats.frameMsAvg} ms
      </div>
      <div>
        <b>p99:</b> {stats.frameMsP99} ms
      </div>
      <div>
        <b>drops:</b> {stats.droppedFrames}
      </div>
      <div>
        <b>long:</b> {stats.longTasks}
      </div>
      {typeof stats.memMB === 'number' && (
        <div>
          <b>mem:</b> {stats.memMB} MB
        </div>
      )}
    </div>
  );
}

export default PerformancePanel;
