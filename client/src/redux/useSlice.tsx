// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  password: string;
  phone: string;
}

const initialState: UserState = {
  username: '',
  password: '',
  phone: '',

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.phone = action.payload.phone;

    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
