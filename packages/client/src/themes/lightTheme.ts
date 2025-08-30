import { theme } from 'antd';

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#3b82f6',
    colorPrimaryHover: '#2563eb',
    colorPrimaryActive: '#1d4ed8',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorErrorHover: '#dc2626',
    colorInfo: '#3b82f6',

    colorBgContainer: '#ffffff',
    colorBgElevated: '#f8fafc',
    colorBgLayout: '#f1f5f9',
    colorBgSpotlight: '#f8fafc',

    colorText: '#1e293b',
    colorTextSecondary: '#475569',
    colorTextTertiary: '#64748b',
    colorTextQuaternary: '#94a3b8',
    colorTextLightSolid: '#ffffff',

    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#e2e8f0',

    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,

    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 28,

    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,

    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    boxShadowSecondary: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  components: {
    Layout: {
      headerBg: '#f8fafc',
      headerColor: '#1e293b',
    },
    Menu: {
      itemBg: 'transparent',
      horizontalItemColor: '#1e293b',
      horizontalItemSelectedColor: '#ffffff',
      horizontalItemSelectedBg: '#3b82f6',
      horizontalItemHoverBg: '#3b82f6',
      itemHoverColor: '#ffffff',
      horizontalItemHeight: 40,
      activeBarHeight: 0,
      lineWidth: 0,
    },
    Button: {
      borderRadius: 8,
      colorPrimary: '#3b82f6',
      colorPrimaryHover: '#2563eb',
      colorPrimaryActive: '#1d4ed8',
      colorPrimaryBorder: '#3b82f6',
    },
    Card: {
      borderRadius: 12,
      colorBorder: '#e5e7eb',
      colorBorderSecondary: '#3b82f6',
      colorBgContainer: '#ffffff',
    },
  },
};
