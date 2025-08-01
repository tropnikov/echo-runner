import { useCallback } from 'react';

import { SignUpRequest, useGetAuthUserQuery, usePostAuthSignupMutation } from '@/api/generated';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';

export const useRegister = () => {
  const [registerMutation] = usePostAuthSignupMutation();
  const { refetch } = useGetAuthUserQuery();
  const dispatch = useAppDispatch();

  const register = useCallback(
    async (values: SignUpRequest) => {
      await registerMutation({ signUpRequest: values }).unwrap();
      const { data } = await refetch();
      if (data) {
        dispatch(setUser(data));
      }
    },
    [dispatch, registerMutation, refetch],
  );

  return { register };
};
