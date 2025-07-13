import PlayButton from '@/components/PlayButton/PlayButton';

import styles from './StartGameView.module.css';

export default function StartGameView({
  text,
  ButtonIcon,
  onButtonClick,
}: {
  text: string;
  ButtonIcon: React.ComponentType<{ style?: React.CSSProperties }>;
  onButtonClick: () => void;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.text}>{text}</h3>
      <PlayButton onClick={onButtonClick} StartIcon={ButtonIcon} />
    </div>
  );
}
