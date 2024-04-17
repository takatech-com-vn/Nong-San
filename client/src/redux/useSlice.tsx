// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  token: string;
  expiryTime: number;
  auth: boolean;
}

const initialState: UserState = {
  username: '',
  token: '',
  expiryTime: 0,
  auth: false, 
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.expiryTime = action.payload.expiryTime;
      state.auth = true;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
