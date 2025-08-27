import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useLazyGetOauthYandexServiceIdQuery, usePostOauthYandexMutation } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { api } from '@/redux/api';
import { useAppDispatch } from '@/redux/store';
import { isErrorWithReason } from '@/types/errors';

export const useYandexOAuth = () => {
  const [getOauthYandexServiceId] = useLazyGetOauthYandexServiceIdQuery();
  const [postOauthYandex] = usePostOauthYandexMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const isProcessingRef = useRef(false);
  const processedCodeRef = useRef<string | null>(null);

  const isClient = typeof window !== 'undefined';
  const redirectUri = isClient ? window.location.origin : '';

  const getOauthYandexUrl = useCallback(
    (serviceId: string) => {
      return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
    },
    [redirectUri],
  );

  const handleOAuthCallback = useCallback(
    async (code: string) => {
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

        // Инвалидируем кэш для принудительного обновления данных пользователя
        dispatch(api.util.resetApiState());

        navigate(`/${appRoutes.GAME}`);

        if (isClient) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Ошибка OAuth авторизации:', error);
        notification.error({
          message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при OAuth авторизации',
        });

        navigate(`/${appRoutes.MAIN}`);

        if (isClient) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } finally {
        isProcessingRef.current = false;
      }
    },
    [postOauthYandex, navigate, notification, redirectUri, dispatch],
  );

  const startOAuthFlow = useCallback(async () => {
    try {
      const { service_id } = await getOauthYandexServiceId({
        redirectUri,
      }).unwrap();

      const oauthUrl = getOauthYandexUrl(service_id);

      if (isClient) {
        window.location.href = oauthUrl;
      }
    } catch (error) {
      console.error('Ошибка при получении service_id:', error);
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при OAuth авторизации',
      });
      throw error;
    }
  }, [getOauthYandexServiceId, redirectUri, getOauthYandexUrl, notification]);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !isProcessingRef.current && processedCodeRef.current !== code) {
      handleOAuthCallback(code);
    }
  }, [searchParams, handleOAuthCallback]);

  return {
    startOAuthFlow,
  };
};
