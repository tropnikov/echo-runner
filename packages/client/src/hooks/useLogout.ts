// hooks/useLogout.ts
import { useCallback } from 'react';

import { usePostAuthLogoutMutation } from '@/api/generated';
import { resetUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';

export const useLogout = () => {
  const [logoutMutation] = usePostAuthLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    await logoutMutation().unwrap();
    dispatch(resetUser());

    // Очистка API кэша в service worker
    if ('serviceWorker' in navigator) {
      const message = { type: 'CLEAR_API_CACHE' as const };
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(message);
      } else {
        // Fallback для случаев когда controller ещё не установлен
        navigator.serviceWorker.ready.then((registration) => {
          registration.active?.postMessage(message);
        });
      }
    }
  }, [dispatch, logoutMutation]);

  return { logout };
};
