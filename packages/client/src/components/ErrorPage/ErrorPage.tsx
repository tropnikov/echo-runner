import { useNavigate } from 'react-router';

import { Button } from 'antd';

import { Helmet } from 'react-helmet-async';

import { title as siteTitle } from '@/constants/siteConfig';

import { ErrorPageProps } from './types';

import styles from './ErrorPage.module.css';

function ErrorPage({ title, text, withBackButton = false, description }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {text} | {siteTitle}
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={styles.errorPageContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        {withBackButton && (
          <Button className={styles.backButton} type="primary" onClick={() => navigate(-1)}>
            Предыдущая страница
          </Button>
        )}
      </div>
    </>
  );
}

export default ErrorPage;
