import { createSlice } from '@reduxjs/toolkit';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthStateInterface {
  status: boolean;
  userData: Tokens | null; // Use the User interface for type safety
}

const initialState: AuthStateInterface = {
  status: false,
  userData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: { payload: { userData: Tokens } }) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
