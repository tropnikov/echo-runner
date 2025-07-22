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
  isAuthorised: null | boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthorised: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuthorised = false;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthorised = true;
    },
    setIsAuthorised: (state, { payload }) => {
      state.isAuthorised = payload;
    },
  },
});

export const { setUser, resetUser, setIsAuthorised } = authSlice.actions;
export default authSlice.reducer;
