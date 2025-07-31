import { useCallback } from 'react';

import { SignInRequest, useGetAuthUserQuery, usePostAuthSigninMutation } from '@/api/generated';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';

export const useLogin = () => {
  const [loginMutation] = usePostAuthSigninMutation();
  const { refetch } = useGetAuthUserQuery();
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (values: SignInRequest) => {
      await loginMutation({ signInRequest: values }).unwrap();
      const { data } = await refetch();
      if (data) {
        dispatch(setUser(data));
      }
    },
    [dispatch, loginMutation, refetch],
  );

  return { login };
};
