import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.auth.user?.id;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
