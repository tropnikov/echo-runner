import { useCallback } from 'react';

import { SignUpRequest, useLazyGetAuthUserQuery, usePostAuthSignupMutation } from '@/api/generated';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';

export const useRegister = () => {
  const [registerMutation] = usePostAuthSignupMutation();
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const dispatch = useAppDispatch();

  const register = useCallback(
    async (values: SignUpRequest) => {
      await registerMutation({ signUpRequest: values }).unwrap();
      const user = await getAuthUser().unwrap();
      if (user) {
        dispatch(setUser(user));
      }
    },
    [dispatch, registerMutation, getAuthUser],
  );

  return { register };
};
