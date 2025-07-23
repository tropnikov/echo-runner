import PlayButton from '@/components/PlayButton/PlayButton';
import { PlayButtonIcon } from '@/types/layout';

import styles from './StartGameView.module.css';

function StartGameView({
  text,
  ButtonIcon,
  onButtonClick,
}: {
  text: string;
  ButtonIcon: PlayButtonIcon;
  onButtonClick: () => void;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.text}>{text}</h3>
      <PlayButton onClick={onButtonClick} StartIcon={ButtonIcon} />
    </div>
  );
}

export default StartGameView;
