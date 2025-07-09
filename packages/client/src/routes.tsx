import { createBrowserRouter } from 'react-router';

import App from './App';

export default createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: () => <div>Главная страница</div> },
      {
        path: 'topics',
        children: [
          { index: true, Component: () => <div>Форум</div> },
          { path: ':topicId', Component: () => <div>Тема форума</div> },
        ],
      },
      { path: 'signin', Component: () => <div>Авторизация</div> },
      { path: 'signup', Component: () => <div>Регистрация</div> },
      { path: 'profile', Component: () => <div>Страница пользователя</div> },
      { path: 'leaderboard', Component: () => <div>Лидерборд</div> },
      { path: 'game', Component: () => <div>Игра</div> },
      { path: 'error', Component: () => <div>Ошибка 500</div> },
      { path: '*', Component: () => <div>Страница не найдена</div> },
    ],
  },
]);
