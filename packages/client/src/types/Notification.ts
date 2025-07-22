export interface NotificationConfig {
  message: string;
  description?: string;
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
}

export interface INotificationContext {
  success: (config: NotificationConfig) => void;
  error: (config: NotificationConfig) => void;
  warning: (config: NotificationConfig) => void;
  info: (config: NotificationConfig) => void;
}
