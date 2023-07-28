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

  registerUserSuccess: boolean,
  registerUserFailed: boolean,

  loginUserSuccess: boolean,
  loginUserFailed: boolean,

  updateUserSuccess: boolean,
  updateUserFailed: boolean,

  getUserSuccess: boolean,
  getUserFailed: boolean,

  requestPasswordForgotSuccess: boolean,
  requestPasswordResetSuccess: boolean,
}

const initialState: User = {
  user: null,
  userAuthorized: false,

  registerUserSuccess: false,
  registerUserFailed: false,

  loginUserSuccess: false,
  loginUserFailed: false,

  updateUserSuccess: false,
  updateUserFailed: false,

  getUserSuccess: false,
  getUserFailed: false,

  requestPasswordForgotSuccess: false,
  requestPasswordResetSuccess: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserAfterRegistration: (state, action: PayloadAction<UserMain>) => {
      return {
        ...state,
        userAuthorized: true,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        }
      }
    },
    registerUserSuccess: (state) => {
      return {
        ...state,
        registerUserSuccess: true,
      }
    },
    registerUserFailed: (state) => {
      return {
        ...state,
        registerUserSuccess: false,
      }
    },
    loginUserSuccess: (state, action: PayloadAction<UserMain>) => {
      return {
        ...state,
        loginUserSuccess: true,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
        userAuthorized: true,
      }
    },
    loginUserFailed: (state) => {
      return {
        ...state,
        loginUserSuccess: false,
      }
    },
    getUserSuccess: (state, action: PayloadAction<UserMain>) => {
      return {
        ...state,
        updateUserSuccess: true,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        }
      }
    },
    getUserFailed: (state) => {
      return {
        ...state,
        updateUserSuccess: false,
      }
    },
    sendUserLogout: (state) => {
      return {
        ...state,
        user: null,
        userAuthorized: false,
        loginUserSuccess: false,
      }
    },
    sendUserUpdate: (state, action: PayloadAction<UserMain>) => {
      return {
        ...state,
        updateUserSuccess: true,
        user: {
          name: action.payload.name,
          email: action.payload.email
        }
      }
    },
    sendPasswordForgot: (state) => {
      return {
        ...state,
        requestPasswordForgotSuccess: true,
      }
    },
    sendPasswordReset: (state) => {
      return {
        ...state,
        requestPasswordResetSuccess: true,
      }
    },
  }
})

const { actions, reducer } = userSlice;

export const { 
  updateUserAfterRegistration, 
  registerUserSuccess, 
  registerUserFailed, 
  loginUserSuccess, 
  loginUserFailed, 
  getUserSuccess, 
  getUserFailed, 
  sendUserLogout,
  sendUserUpdate,
  sendPasswordForgot,
  sendPasswordReset,
} = actions;

export default reducer;