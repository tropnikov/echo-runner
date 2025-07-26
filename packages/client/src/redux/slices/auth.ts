import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string;
  password: string;
  phone: string;
}

export interface AuthState {
  user: IUser | null;
  isAuthorized: null | boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthorized: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthorized = true;
    },
    setIsAuthorized: (state, { payload }) => {
      state.isAuthorized = payload;
    },
  },
});

export const { setUser, resetUser, setIsAuthorized } = authSlice.actions;
export default authSlice.reducer;
