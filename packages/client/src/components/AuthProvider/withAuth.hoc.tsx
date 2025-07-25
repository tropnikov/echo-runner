import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';

import { Spin } from 'antd';

import { appRoutes, protectedRoutes } from '@/constants/appRoutes';

import { useAuth } from './AuthProvider';

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>): FC<T> {
  return (props: T) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
          <Spin size="large" />
        </div>
      );
    }

    const currentPath = location.pathname.split('/').filter(Boolean)[0] || '/';
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if (!auth.isAuthorized && isProtectedRoute) {
      return <Navigate to={`/${appRoutes.SIGNIN}`} replace state={{ from: location }} />;
    }

    return <WrappedComponent {...props} />;
  };
}
