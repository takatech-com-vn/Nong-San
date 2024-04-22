import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  auth: boolean;
  id: number;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
