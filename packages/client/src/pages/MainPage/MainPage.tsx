import { FC } from 'react';

import { Space } from 'antd';

import FeatureBlock from '@/components/MainPage/FeatureBlock';
import GalleryBlock from '@/components/MainPage/GalleryBlock';
import HeroBlock from '@/components/MainPage/HeroBlock';
import ReviewBlock from '@/components/MainPage/ReviewBlock';

import { withMeta } from '@/hocs/withMeta';

const MainPage: FC = () => {
  return (
    <Space direction={'vertical'} size={'large'} style={{ width: '100%' }}>
      <HeroBlock />
      <FeatureBlock />
      <GalleryBlock />
      <ReviewBlock />
    </Space>
  );
};

export default withMeta(MainPage, {
  title: 'Главная',
  description:
    'Добро пожаловать в Echo Runner! Увлекательная игра-платформер с соревновательными элементами. Играйте, достигайте новых рекордов и поднимайтесь в таблице лидеров.',
  keywords: 'главная страница, echo runner, игра, платформер, начать игру, рекорды',
  url: '/',
});
