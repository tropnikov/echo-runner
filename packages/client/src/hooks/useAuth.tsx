import { useContext } from 'react';

import { AuthContext } from '@/components/AuthProvider/AuthProvider';
import { IAuthContext } from '@/types/Auth';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
