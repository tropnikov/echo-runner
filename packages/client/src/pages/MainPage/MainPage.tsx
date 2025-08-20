import { FC } from 'react';

import { Space } from 'antd';

import { Helmet } from 'react-helmet-async';

import FeatureBlock from '@/components/MainPage/FeatureBlock';
import GalleryBlock from '@/components/MainPage/GalleryBlock';
import HeroBlock from '@/components/MainPage/HeroBlock';
import ReviewBlock from '@/components/MainPage/ReviewBlock';

const MainPage: FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Главная</title>
        <meta name="description" content="Главная страница" />
      </Helmet>
      <Space direction={'vertical'} size={'large'} style={{ width: '100%' }}>
        <HeroBlock />
        <FeatureBlock />
        <GalleryBlock />
        <ReviewBlock />
      </Space>
    </>
  );
};

export default MainPage;
