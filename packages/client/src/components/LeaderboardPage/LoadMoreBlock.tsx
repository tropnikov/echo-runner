import { FC } from 'react';

import { Button, Flex } from 'antd';

const LoadMoreBlock: FC = () => {
  return (
    <Flex align="center" justify="center">
      <Button type="default" size="large">
        Загрузить больше
      </Button>
    </Flex>
  );
};

export default LoadMoreBlock;
