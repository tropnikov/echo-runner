import { createContext, useMemo, type ReactNode } from 'react';

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

  const logout = async () => {
    logoutUser().then(() => {
      dispatch(resetUser());
    });
  };

  const value = useMemo(
    () => ({
      logout,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
