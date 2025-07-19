import { FC } from 'react';

import { Card, Col, Row, Statistic } from 'antd';

const StatsBlock: FC = () => {
  return (
    <Row gutter={[16, 16]} justify="center" align="stretch">
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Всего игроков" value={456} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Сыграно игр" value={234} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Лучший результат" value={278} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic title="Активных пользователей" value={123} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsBlock;
