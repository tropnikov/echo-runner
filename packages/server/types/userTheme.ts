import { Request } from 'express';

export interface GetUserThemeParams {
  userId: string;
}

export interface SetUserThemeBody {
  theme: string;
}

export type GetUserThemeRequest = Request;

export type SetUserThemeRequest = Request<Record<string, unknown>, Record<string, unknown>, SetUserThemeBody>;

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
