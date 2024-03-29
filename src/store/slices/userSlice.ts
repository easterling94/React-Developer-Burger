import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserMain = {
  name: string,
  email: string,
}

export interface User {
  user: {
    name: string,
    email: string,
  } | null;
  userAuthorized: boolean,
  passwordReset: boolean,
  userChecked: boolean,
}

const initialState: User = {
  user: null,
  userAuthorized: false,
  passwordReset: false,
  userChecked: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserMain>) => {
      state.user = action.payload;
      state.userAuthorized = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userAuthorized = !state.userAuthorized;
    },
    passwordReset: (state) => {
      state.passwordReset = !state.passwordReset;
    },
    checkUser: (state, action: PayloadAction<boolean>) => {
      state.userChecked = action.payload;
    }
  }
})

const { actions, reducer } = userSlice;

export const { 
  updateUser, 
  logoutUser,
  passwordReset,
  checkUser
} = actions;

export default reducer;