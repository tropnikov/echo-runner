import { Col, Row } from 'antd';

import { userReviews } from '@/constants/userReviews';

import ReviewCard from './ReviewCard';
import SectionBlock from './SectionBlock';
import SectionHeader from './SectionHeader';

import styles from './ReviewBlock.module.css';

const ReviewBlock = () => {
  const title = 'Отзывы игроков';
  const description = 'Узнай, что говорят наши игроки';
  return (
    <SectionBlock>
      <SectionHeader title={title} description={description} />
      <Row gutter={[32, 32]} align="stretch" className={styles.reviewBlockRow}>
        {userReviews.map((review) => (
          <Col span={8} key={review.id} xs={24} sm={12} md={8} className={styles.reviewBlockCol}>
            <div className={styles.reviewBlockCardWrapper}>
              <ReviewCard review={review} />
            </div>
          </Col>
        ))}
      </Row>
    </SectionBlock>
  );
};

export default ReviewBlock;
