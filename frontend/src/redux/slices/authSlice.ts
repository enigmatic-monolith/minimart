import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Enums } from '../../database.types';
import { User } from '@supabase/supabase-js';

export type AppRole = Enums<'app_role'>;

interface AuthState {
  accessToken: string | null;
  role: AppRole | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  role: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ accessToken: string; role: AppRole;  user: User}>) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
