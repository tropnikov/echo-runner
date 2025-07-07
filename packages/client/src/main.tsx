import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Главная страница</div>} />
          <Route path="topics">
            <Route index element={<div>Форум</div>} />
            <Route path=":topicId" element={<div>Тема форума</div>} />
          </Route>
          <Route path="signin" element={<div>Авторизация</div>} />
          <Route path="signup" element={<div>Регистрация</div>} />
          <Route path="profile" element={<div>Страница пользователя</div>} />
          <Route path="leaderboard" element={<div>Лидерборд</div>} />
          <Route path="start_game" element={<div>Начало игры</div>} />
          <Route path="finish_game" element={<div>Окончание игры</div>} />
          <Route path="error" element={<div>Ошибка 500</div>} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
