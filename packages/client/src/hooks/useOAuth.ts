import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import {
  GetOauthYandexServiceIdApiResponse,
  useLazyGetOauthYandexServiceIdQuery,
  usePostOauthYandexMutation,
} from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { isErrorWithReason } from '@/types/errors';

export const useOAuth = () => {
  const [getOauthYandexServiceId] = useLazyGetOauthYandexServiceIdQuery();
  const [postOauthYandex] = usePostOauthYandexMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notification = useNotification();
  const isProcessingRef = useRef(false);
  const processedCodeRef = useRef<string | null>(null);

  const redirectUri = window.location.origin;

  // Обработка OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !isProcessingRef.current && processedCodeRef.current !== code) {
      handleOAuthCallback(code);
    }
  }, [searchParams, postOauthYandex, navigate, notification, redirectUri]);

  const handleOAuthCallback = async (code: string) => {
    isProcessingRef.current = true;
    processedCodeRef.current = code;

    try {
      await postOauthYandex({
        oauthSignInRequest: {
          code,
          redirect_uri: redirectUri,
        },
      }).unwrap();

      notification.success({
        message: 'OAuth авторизация прошла успешно',
      });

      navigate(`/${appRoutes.MAIN}`);

      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Ошибка OAuth авторизации:', error);
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при OAuth авторизации',
      });

      navigate(`/${appRoutes.MAIN}`);

      window.history.replaceState({}, document.title, window.location.pathname);
    } finally {
      isProcessingRef.current = false;
    }
  };

  // Инициализация OAuth авторизации
  const oauthInit = useCallback(async () => {
    try {
      const { service_id }: GetOauthYandexServiceIdApiResponse = await getOauthYandexServiceId({
        redirectUri,
      }).unwrap();

      const oauthUrl = getOauthYandexUrl(service_id);

      document.location.href = oauthUrl;
    } catch (error) {
      console.error('Ошибка при получении service_id:', error);
      throw error;
    }
  }, [getOauthYandexServiceId, redirectUri]);

  const getOauthYandexUrl = (serviceId: string) => {
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
  };

  return {
    oauthInit,
  };
};
