import { HelmetData } from 'react-helmet';

export type RenderResult = {
  antStyles: string;
  html: string;
  helmet: HelmetData;
  initialState: unknown;
};
