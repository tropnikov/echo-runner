type Props = {
  fps: number;
  avg: number;
  p99: number;
  drops: number;
  longTasks: number;
  memMB?: number;
};

export default function StatsOverlay({ fps, avg, p99, drops, longTasks, memMB }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 12,
        bottom: 12,
        padding: '8px 10px',
        background: 'rgba(0,0,0,0.6)',
        color: '#fff',
        font: '12px/1.4 system-ui, sans-serif',
        borderRadius: 8,
        zIndex: 9999,
        minWidth: 160,
      }}>
      <div>
        <b>FPS:</b> {fps}
      </div>
      <div>
        <b>avg:</b> {avg} ms
      </div>
      <div>
        <b>p99:</b> {p99} ms
      </div>
      <div>
        <b>drops:</b> {drops}
      </div>
      <div>
        <b>long tasks:</b> {longTasks}
      </div>
      {typeof memMB === 'number' && (
        <div>
          <b>mem:</b> {memMB} MB
        </div>
      )}
    </div>
  );
}
