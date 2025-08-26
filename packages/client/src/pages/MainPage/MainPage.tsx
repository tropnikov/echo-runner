import { FC } from 'react';

import { Space } from 'antd';

import { Helmet } from 'react-helmet-async';

import FeatureBlock from '@/components/MainPage/FeatureBlock';
import GalleryBlock from '@/components/MainPage/GalleryBlock';
import HeroBlock from '@/components/MainPage/HeroBlock';
import ReviewBlock from '@/components/MainPage/ReviewBlock';
import { title } from '@/constants/siteConfig';

const MainPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Главная | {title}</title>
        <meta
          name="description"
          content="Добро пожаловать в Echo Runner! Увлекательная игра-платформер с соревновательными элементами. Играйте, достигайте новых рекордов и поднимайтесь в таблице лидеров."
        />
        <meta name="keywords" content="главная страница, echo runner, игра, платформер, начать игру, рекорды" />
        <meta property="og:title" content={`Главная | ${title}`} />
        <meta
          property="og:description"
          content="Добро пожаловать в Echo Runner! Увлекательная игра-платформер с соревновательными элементами."
        />
        <meta property="og:url" content="/" />
        <meta name="twitter:title" content={`Главная | ${title}`} />
        <meta
          name="twitter:description"
          content="Добро пожаловать в Echo Runner! Увлекательная игра-платформер с соревновательными элементами."
        />
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
