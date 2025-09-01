import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.auth.user?.id;
