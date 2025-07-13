import { useContext } from 'react';

import { NotificationContext } from '@/components/NotificationProvider/NotificationProvider';
import { INotificationContext } from '@/types/Notification';

export const useNotification = (): INotificationContext => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
