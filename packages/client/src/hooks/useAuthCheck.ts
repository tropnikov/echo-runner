import { useEffect } from 'react';

import { useGetAuthUserQuery } from '@/api/generated';
import { resetUser, setUser } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useGetAuthUserQuery();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    if (data && isAuthorized === null) {
      dispatch(setUser(data));
    } else if (isError && isAuthorized === null) {
      dispatch(resetUser());
    }
  }, [data, isError, isAuthorized, dispatch]);

  return {
    isAuthorized,
    isLoading,
  };
};
