import { Card, Col, Row } from 'antd';

import { features } from '@/constants/features';

import FeatureCard from './FeatureCard';
import SectionBlock from './SectionBlock';
import SectionHeader from './SectionHeader';

import styles from './FeatureBlock.module.css';

const FeatureBlock = () => {
  const title = 'Особенности игры';
  const description = 'Узнай, что делает наш раннер уникальным';

  return (
    <SectionBlock className="feature-block">
      <SectionHeader title={title} description={description} />
      <Row gutter={[16, 16]} justify="center" align="stretch">
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} md={6} className={styles['feature-block__col']}>
            <Card className={styles['feature-block__card']}>
              <FeatureCard feature={feature} />
            </Card>
          </Col>
        ))}
      </Row>
    </SectionBlock>
  );
};

export default FeatureBlock;
