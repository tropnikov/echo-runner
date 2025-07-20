import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IReasonableError {
  status: number;
  data: {
    reason: string;
  };
}

export const isFetchBaseQueryErrorType = (error: unknown): error is FetchBaseQueryError =>
  typeof error === 'object' && error !== null && 'status' in error;

export const isErrorWithReason = (error: unknown): error is IReasonableError =>
  isFetchBaseQueryErrorType(error) && typeof error.data === 'object' && error.data !== null && 'reason' in error.data;
