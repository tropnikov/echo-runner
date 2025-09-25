import avatar1 from '@/assets/avatar1.jpg?url';
import avatar2 from '@/assets/avatar2.jpg?url';
import avatar3 from '@/assets/avatar3.jpg?url';
import { UserReview } from '@/components/MainPage/ReviewCard';

export const userReviews: UserReview[] = [
  {
    id: 1,
    name: 'Иван Иванов',
    avatar: avatar1,
    date: '10 июля 2025',
    rating: 4,
    text: 'Игра превзошла мои ожидания. Качество отличное, играть очень интересно. Обязательно порекомендую друзьям!',
  },
  {
    id: 2,
    name: 'Мария Смирнова',
    avatar: avatar2,
    date: '22 июня 2025',
    rating: 5,
    text: 'Потрясающая игра! Очень затягивает, особенно нравится играть с друзьями.',
  },
  {
    id: 3,
    name: 'Алексей Петров',
    avatar: avatar3,
    date: '15 мая 2025',
    rating: 3,
    text: 'Графика отличная, но хотелось бы больше уровней в будущем.',
  },
];
