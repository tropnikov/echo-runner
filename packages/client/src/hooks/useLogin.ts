import { useCallback } from 'react';

import { SignInRequest, useLazyGetAuthUserQuery, usePostAuthSigninMutation } from '@/api/generated';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';

export const useLogin = () => {
  const [loginMutation] = usePostAuthSigninMutation();
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (values: SignInRequest) => {
      await loginMutation({ signInRequest: values }).unwrap();
      const user = await getAuthUser().unwrap();
      if (user) {
        dispatch(setUser(user));
      }
    },
    [dispatch, loginMutation, getAuthUser],
  );

  return { login };
};
