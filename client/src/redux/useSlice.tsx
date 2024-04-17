// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  token: string;
  expiryTime: number;
  auth: boolean;
  id: number;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const initialState: UserState = {
  username: '',
  token: '',
  expiryTime: 0,
  auth: false,
  id: 0,
  phone: '',
  role: '',
  created_at: '',
  updated_at: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
     state.username = action.payload.username;
      state.token = action.payload.token;
      state.expiryTime = action.payload.expiryTime;
      state.auth = action.payload.auth;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
    },
    logout: (state) => {
      state.username = '';
      state.token = '';
      state.expiryTime = 0;
      state.auth = false;
      state.id= 0;
      state.phone= '';
      state.role= '';
      state.created_at= '';
      state.updated_at= '';
    },
  },
});

export const { setUser,logout  } = userSlice.actions;

export default userSlice.reducer;
