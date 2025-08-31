import { theme } from 'antd';

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#6366f1',
    colorPrimaryHover: '#4f46e5',
    colorPrimaryActive: '#4338ca',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorErrorHover: '#dc2626',
    colorInfo: '#6366f1',

    colorBgContainer: '#1e293b',
    colorBgElevated: '#334155',
    colorBgLayout: '#0f172a',
    colorBgSpotlight: '#334155',

    colorText: '#e2e8f0',
    colorTextSecondary: '#94a3b8',
    colorTextTertiary: '#64748b',
    colorTextQuaternary: '#475569',
    colorTextLightSolid: '#ffffff',

    colorBorder: '#475569',
    colorBorderSecondary: '#64748b',

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

    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    boxShadowSecondary: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  components: {
    Layout: {
      headerBg: '#1e293b',
      headerColor: '#e2e8f0',
    },
    Menu: {
      itemBg: 'transparent',
      horizontalItemColor: '#e2e8f0',
      horizontalItemSelectedColor: '#e2e8f0',
      horizontalItemSelectedBg: '#6366f1',
      horizontalItemHoverBg: '#6366f1',
      horizontalItemHeight: 40,
      activeBarHeight: 0,
      lineWidth: 0,
    },
    Button: {
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
      colorBorderSecondary: '#6366f1',
      colorBgContainer: '#1e293b',
    },
  },
};
