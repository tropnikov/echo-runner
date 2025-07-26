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
  }, [dispatch, logoutMutation]);

  return { logout };
};
