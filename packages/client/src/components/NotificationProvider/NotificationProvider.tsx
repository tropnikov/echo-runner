import { createContext, FC, ReactNode } from 'react';

import { notification } from 'antd';

import { INotificationContext, NotificationConfig } from '@/types/Notification';

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const defaultConfig: Partial<NotificationConfig> = {
    duration: 5,
    placement: 'topRight',
  };

  const success = (config: NotificationConfig) => {
    api.success({
      message: config.message,
      description: config.description,
      ...defaultConfig,
    });
  };

  const error = (config: NotificationConfig) => {
    api.error({
      message: config.message,
      description: config.description,
      ...defaultConfig,
    });
  };

  const warning = (config: NotificationConfig) => {
    api.warning({
      message: config.message,
      description: config.description,
      ...defaultConfig,
    });
  };

  const info = (config: NotificationConfig) => {
    api.info({
      message: config.message,
      description: config.description,
      ...defaultConfig,
    });
  };

  const contextValue: INotificationContext = {
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
export { NotificationContext };
