import { useCallback } from 'react';

import { SignUpRequest, usePostAuthSignupMutation } from '@/api/generated';

export const useRegister = () => {
  const [registerMutation] = usePostAuthSignupMutation();

  const register = useCallback(
    async (values: SignUpRequest) => {
      await registerMutation({ signUpRequest: values }).unwrap();
    },
    [registerMutation],
  );

  return { register };
};
