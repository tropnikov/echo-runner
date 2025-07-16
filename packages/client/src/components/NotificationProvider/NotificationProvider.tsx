import { createContext, FC, ReactNode } from 'react';

import { notification } from 'antd';

import { INotificationContext, NotificationConfig } from '@/types/Notification';

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const defaultConfig: Partial<NotificationConfig> = {
    duration: 5,
    placement: 'topRight',
  };

  const showNotification = (type: NotificationType, config: NotificationConfig) => {
    api[type]({
      message: config.message,
      description: config.description,
      ...defaultConfig,
    });
  };

  const success = (config: NotificationConfig) => showNotification('success', config);
  const error = (config: NotificationConfig) => showNotification('error', config);
  const warning = (config: NotificationConfig) => showNotification('warning', config);
  const info = (config: NotificationConfig) => showNotification('info', config);

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
