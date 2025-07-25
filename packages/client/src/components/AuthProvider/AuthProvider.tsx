import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { useGetAuthUserQuery, usePostAuthLogoutMutation, usePostAuthSigninMutation } from '@/api/generated';
import { resetUser, setUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';
import { IAuthContext } from '@/types/Auth';

interface IProps {
  children: ReactNode;
}

interface IAuthContextValue extends IAuthContext {
  isAuthorized: boolean;
  isLoading: boolean;
  login: (values: { login: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: IProps) => {
  const [logoutUser] = usePostAuthLogoutMutation();
  const [auth] = usePostAuthSigninMutation();
  const dispatch = useAppDispatch();
  const { data: userData, isError: isUserDataError, refetch } = useGetAuthUserQuery();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(
    async (values: { login: string; password: string }) => {
      try {
        await auth({ signInRequest: values }).unwrap();
        // После успешного логина делаем запрос за пользователем
        const { data: freshUser } = await refetch();
        if (freshUser) {
          dispatch(setUser(freshUser));
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log('Login failed:', error);
        throw error;
      }
    },
    [auth, dispatch, refetch],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser().unwrap();
      dispatch(resetUser());
      setIsAuthorized(false); // Добавляем явное обновление состояния
    } catch (error) {
      console.log('Logout failed:', error);
      throw error;
    }
  }, [logoutUser, dispatch]);

  useEffect(() => {
    setIsLoading(true); // Устанавливаем loading в true при старте эффекта

    if (userData) {
      dispatch(setUser(userData));
      setIsAuthorized(true);
      setIsLoading(false);
    } else if (isUserDataError) {
      dispatch(resetUser());
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, [userData, isUserDataError, dispatch]);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthorized,
      isLoading,
    }),
    [login, logout, isAuthorized, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): IAuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, useAuth };
export default AuthProvider;
