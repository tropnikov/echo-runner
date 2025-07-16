import { RocketOutlined, TeamOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';

import { FeatureInfo } from '@/components/MainPage/FeatureCard';

export const features: Array<FeatureInfo> = [
  {
    text: 'Скорость',
    icon: <RocketOutlined />,
    description: 'Молниеносный запуск и плавный игровой процесс без задержек — начни играть за секунды!',
  },
  {
    text: 'Уровни',
    icon: <ThunderboltOutlined />,
    description: 'Разнообразные уровни и препятствия, которые не дадут заскучать ни новичку, ни профи.',
  },
  {
    text: 'Форум',
    icon: <TeamOutlined />,
    description: 'Общайся с другими игроками, делись советами и находи единомышленников!',
  },
  {
    text: 'Таблица лидеров',
    icon: <TrophyOutlined />,
    description: 'Соревнуйся с другими игроками и занимай верхние строчки рейтинга!',
  },
];
