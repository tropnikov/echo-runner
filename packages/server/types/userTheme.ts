import { Request } from 'express';

export interface GetUserThemeParams {
  userId: string;
}

export interface SetUserThemeBody {
  userId: number;
  theme: string;
}

export type GetUserThemeRequest = Request<GetUserThemeParams>;

export type SetUserThemeRequest = Request<Record<string, never>, Record<string, never>, SetUserThemeBody>;

export interface UserThemeResponse {
  id: number;
  userId: number;
  theme: string;
}

export interface ErrorResponse {
  error: string;
}

export type ApiError = {
  message: string;
  statusCode: number;
};
