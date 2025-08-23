import { useEffect } from 'react';

import { useGetAuthUserQuery } from '@/api/generated';
import { resetUser, setUser } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isSuccess } = useGetAuthUserQuery();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    } else if (!isLoading && isError) {
      dispatch(resetUser());
    }
  }, [data, isError, isLoading, isSuccess, dispatch]);

  return {
    isAuthorized,
    isLoading: isAuthorized === null || isLoading,
  };
};
