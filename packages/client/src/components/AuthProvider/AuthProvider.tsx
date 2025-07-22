import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

import { usePostAuthLogoutMutation } from '@/api/generated';
import { resetUser } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store';
import { IAuthContext } from '@/types/Auth';

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: IProps) => {
  const [logoutUser] = usePostAuthLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    try {
      await logoutUser().unwrap();
      dispatch(resetUser());
    } catch (error) {
      console.log('Logout failed:', error);

      throw error;
    }
  }, [logoutUser, dispatch]);

  const value = useMemo(
    () => ({
      logout,
    }),
    [logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, useAuth };
export default AuthProvider;
