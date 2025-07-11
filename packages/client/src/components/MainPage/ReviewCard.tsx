import { Avatar, Card, Rate } from 'antd';

import styles from './ReviewCard.module.css';

export type UserReview = {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
};

interface ReviewCardProps {
  review: UserReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className={styles['review-card']}>
      <Card.Meta avatar={<Avatar src={review.avatar} size={'large'} />} title={review.name} description={review.date} />
      <div className={styles['review-card__content']}>
        <Rate disabled defaultValue={review.rating} />
        <p>{review.text}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
