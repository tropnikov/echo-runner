import { useNavigate } from 'react-router';

import { Button } from 'antd';

import styles from './ErrorPage.module.css';

export default function ErrorPage({
  title,
  text,
  withBackButton = false,
}: {
  title: string;
  text: string;
  withBackButton?: boolean;
}) {
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
