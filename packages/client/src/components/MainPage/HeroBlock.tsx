import { useNavigate } from 'react-router-dom';

import { Button, Col, Row } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';

import { appRoutes } from '@/constants/appRoutes';

import styles from './HeroBlock.module.css';

const HeroBlock = () => {
  const navigate = useNavigate();
  const title = 'Echo Runner';
  const description =
    'Погрузись в мир Echo Runner — где каждый прыжок звучит эхом твоей смелости, а скорость уносит навстречу приключениям. Здесь горизонты бесконечны, а каждый уровень — новая история, полная азарта, дружбы и побед. Оставь свой след на трассе, стань героем легенды и почувствуй, как игра становится частью тебя. Твой забег начинается сейчас — осмелишься ли ты сделать первый шаг?';

  const cover =
    'https://images.unsplash.com/photo-1580464360012-948b4fe5ddc2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const handleStartClick = () => {
    navigate(appRoutes.SIGNIN);
  };

  return (
    <div className="hero-header">
      <Row gutter={16} align="middle">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <h1 style={{ fontSize: '80px' }}>{title}</h1>
          <p>{description}</p>
          <Button type="primary" size="large" icon={<PlayCircleFilled />} onClick={handleStartClick}>
            Начать играть
          </Button>
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
          <div className={styles.heroHeaderCoverWrapper}>
            <img src={cover} alt="Обложка HeroBlock" className={styles.heroHeaderCoverImage} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeroBlock;
