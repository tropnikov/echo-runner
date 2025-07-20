import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { PlayButtonIcon } from '@/types/layout';

import styles from './PlayButton.module.css';

function PlayButton({ onClick, StartIcon }: { onClick: () => void; StartIcon: PlayButtonIcon }) {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && count > 0) {
      timer = setTimeout(() => setCount(count - 1), 1000);
    } else if (isCounting && count === 0) {
      setIsCounting(false);
      setCount(3);
      onClick();
    }

    return () => clearTimeout(timer);
  }, [isCounting, count]);

  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={
        isCounting ? (
          <div className={styles.loadContainer}>
            <LoadingOutlined style={{ fontSize: 64, position: 'absolute' }} />
            <span className={styles.countTimer}>{count}</span>
          </div>
        ) : (
          <StartIcon style={{ fontSize: 32 }} />
        )
      }
      onClick={() => setIsCounting(true)}
      disabled={isCounting}
      style={{ width: 64, height: 64 }}
    />
  );
}

export default PlayButton;
