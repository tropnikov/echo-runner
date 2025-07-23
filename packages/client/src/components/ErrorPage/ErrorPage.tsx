import { useNavigate } from 'react-router';

import { Button } from 'antd';

import { ErrorPageProps } from './types';

import styles from './ErrorPage.module.css';

function ErrorPage({ title, text, withBackButton = false }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.errorPageContainer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      {withBackButton && (
        <Button className={styles.backButton} type="primary" onClick={() => navigate(-1)}>
          Предыдущая страница
        </Button>
      )}
    </div>
  );
}

export default ErrorPage;
