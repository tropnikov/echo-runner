import { FC } from 'react';

import { Button, Flex } from 'antd';

import { LoadMoreBlockProps } from './types';

const LoadMoreBlock: FC<LoadMoreBlockProps> = ({ onLoadMore }) => {
  return (
    <Flex align="center" justify="center">
      <Button type="default" size="large" onClick={onLoadMore}>
        Загрузить больше
      </Button>
    </Flex>
  );
};

export default LoadMoreBlock;
