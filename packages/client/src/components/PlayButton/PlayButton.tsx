import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function PlayButton({
  onClick,
  StartIcon,
}: {
  onClick: () => void;
  StartIcon: React.ComponentType<{ style?: React.CSSProperties }>;
}) {
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LoadingOutlined
              style={{
                fontSize: 64,
                position: 'absolute',
              }}
            />
            <span
              style={{
                fontSize: 32,
                fontWeight: 'bold',
              }}>
              {count}
            </span>
          </div>
        ) : (
          <StartIcon
            style={{
              fontSize: 24,
            }}
          />
        )
      }
      onClick={() => setIsCounting(true)}
      disabled={isCounting}
      style={{
        width: 64,
        height: 64,
      }}
    />
  );
}
