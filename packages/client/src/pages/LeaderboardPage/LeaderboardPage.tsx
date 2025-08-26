import { FC, useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';

import { Helmet } from 'react-helmet-async';

import HeroBlock from '@/components/LeaderboardPage/HeroBlock';
import LeaderboardTable from '@/components/LeaderboardPage/LeaderboardTable';
import LoadMoreBlock from '@/components/LeaderboardPage/LoadMoreBlock';
import { LeaderboardRecord } from '@/components/LeaderboardPage/types';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { title } from '@/constants/siteConfig';
import { GetAllRatingsResponse, useLeaderboard } from '@/hooks/useLeaderboard';
import { isErrorWithReason } from '@/types/errors';

const LeaderboardPage: FC = () => {
  const limitDelta = 10;

  const { getAllRatings } = useLeaderboard();
  const [data, setData] = useState<LeaderboardRecord[]>([]);
  const [limit, setLimit] = useState<number>(limitDelta);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const notification = useNotification();

  const updateRatings = useCallback(async () => {
    let response: GetAllRatingsResponse[] = [];
    try {
      response = await getAllRatings({ ratingFieldName: 'score', cursor: 0, limit });
    } catch (error) {
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при получении рейтингов',
      });
    }

    setShowLoadMore(response.length == limit);
    setData(
      response.map((item) => {
        return { key: item.data.user_id, player: item.data.login, score: item.data.score };
      }),
    );
  }, [getAllRatings, limit]);

  useEffect(() => {
    updateRatings();
  }, [limit]);

  return (
    <>
      <Helmet>
        <title>Лидерборд | {title}</title>
        <meta
          name="description"
          content="Таблица лидеров Echo Runner. Посмотрите на лучших игроков, их рекорды и достижения. Соревнуйтесь за место в топе!"
        />
        <meta name="keywords" content="лидерборд, таблица лидеров, рейтинг, рекорды, echo runner, топ игроков, очки" />
        <meta property="og:title" content={`Лидерборд | ${title}`} />
        <meta
          property="og:description"
          content="Таблица лидеров Echo Runner. Посмотрите на лучших игроков, их рекорды и достижения."
        />
        <meta property="og:url" content="/leaderboard" />
        <meta name="twitter:title" content={`Лидерборд | ${title}`} />
        <meta
          name="twitter:description"
          content="Таблица лидеров Echo Runner. Посмотрите на лучших игроков, их рекорды и достижения."
        />
      </Helmet>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <HeroBlock onUpdate={updateRatings} />
        <LeaderboardTable data={data} />
        {showLoadMore && (
          <LoadMoreBlock
            onLoadMore={() => {
              setLimit((l) => l + limitDelta);
            }}
          />
        )}
      </Space>
    </>
  );
};

export default LeaderboardPage;
