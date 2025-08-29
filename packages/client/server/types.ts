import type { HelmetServerState } from 'react-helmet-async';

import type { RootState } from '@/redux/store';

export interface RenderResult {
  antStyles: string;
  html: string;
  helmet?: HelmetServerState;
  initialState?: RootState;
}
