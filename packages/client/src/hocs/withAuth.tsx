import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';

import { Spin } from 'antd';

import { appRoutes, protectedRoutes } from '@/constants/appRoutes';
import { useAuthCheck } from '@/hooks/useAuthCheck';

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>): FC<T> {
  return (props: T) => {
    const { isLoading, isAuthorized } = useAuthCheck();
    const location = useLocation();

    if (isLoading || isAuthorized === null) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
          <Spin size="large" />
        </div>
      );
    }

    const currentPath = location.pathname.split('/').filter(Boolean)[0] || '/';
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if (!isAuthorized && isProtectedRoute) {
      return <Navigate to={`/${appRoutes.SIGNIN}`} replace state={{ from: location }} />;
    }

    return <WrappedComponent {...props} />;
  };
}
