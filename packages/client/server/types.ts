import type { HelmetServerState } from 'react-helmet-async';

export type RenderResult = {
  antStyles: string;
  html: string;
  helmet?: HelmetServerState;
};
