import { FC } from 'react';
import { useNavigate } from 'react-router';

import { Button, Flex } from 'antd';
import { PlayCircleFilled, ReloadOutlined } from '@ant-design/icons';

import SectionHeader from '@/components/MainPage/SectionHeader';
import { appRoutes } from '@/constants/appRoutes';

import { HeroBlockProps } from './types';

const HeroBlock: FC<HeroBlockProps> = ({ onUpdate }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(`/${appRoutes.GAME}`);
  };

  return (
    <Flex align="center" justify="center" vertical gap={20}>
      <SectionHeader
        title="Таблица лидеров"
        description="Соревнуйтесь с игроками по всему миру и поднимайтесь на вершину рейтинга"
      />

      <Flex gap={10}>
        <Button type="default" size="large" icon={<ReloadOutlined />} onClick={onUpdate}>
          Обновить
        </Button>
        <Button type="primary" size="large" icon={<PlayCircleFilled />} onClick={handleStartClick}>
          Играть
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeroBlock;
