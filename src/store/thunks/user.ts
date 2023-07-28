import { AppDispatch } from '../store';
import {
  sendRegisterRequestAPI,
  sendLoginUserAPI,
  sendGetUserAPI,
  sendLogoutUserAPI,
  sendUpdateUserAPI,
  sendForgotPasswordAPI,
  sendResetPasswordAPI,
} from '../../utils/api';

import { 
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
} from '../slices/userSlice';

import { 
  checkResponse,
  handleNetworkError,
} from '../../utils/api'

import {
  setCookie,
} from '../../utils/cookie';

export const sendRegisterRequestThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  sendRegisterRequestAPI(name, email, password)
  .then(checkResponse)
  .then(data => {
    const authToken = data.accessToken.split('Bearer ')[1];
    const refreshToken = data.refreshToken;
    setCookie('accessToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('name', data.user.name);
    setCookie('email', data.user.email);
    dispatch(registerUserSuccess())
    dispatch(updateUserAfterRegistration(data.user))
    return data
  })
  .catch(handleNetworkError)
  dispatch(registerUserFailed());
}

export const sendLoginUserThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  sendLoginUserAPI(email, password)
  .then(checkResponse)
  .then(data => {
    const authToken = data.accessToken.split('Bearer ')[1];
    const refreshToken = data.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', authToken);
    setCookie('name', data.user.name);
    setCookie('email', data.user.email);
    dispatch(loginUserSuccess(data.user));
    return data
  })
  .catch(handleNetworkError)
  dispatch(loginUserFailed());
}

export const sendGetUserThunk = () => (dispatch: AppDispatch) => {
  sendGetUserAPI()
  .then(data => {
    dispatch(getUserSuccess(data.user));
    setCookie('name', data.user.name);
    setCookie('email', data.user.email);
    return data
  })
  .catch(handleNetworkError);
  dispatch(getUserFailed());
}


export const sendUpdateUserThunk = (name: string, email: string) => (dispatch: AppDispatch) => {
  sendUpdateUserAPI(name, email)
  .then(data => {
    dispatch(sendUserUpdate({
        name: name,
        email: email,
      }))
    setCookie('name', data.user.name);
    setCookie('email', data.user.email);
    alert('Данные пользователя успешно обновились')
    return data
  })
  .catch(handleNetworkError);
}

export const sendLogoutUserThunk = () => (dispatch: AppDispatch) => {
  sendLogoutUserAPI()
  .then(checkResponse)
  .then(data => {
    setCookie('name', null, { expires: -1 })
    setCookie('email', null, { expires: -1 })
    setCookie('accessToken', null, { expires: -1 })
    localStorage.removeItem('refreshToken')
    dispatch(sendUserLogout())
    alert('Вы успешно вышли из аккаунта')
    return data
  })
  .catch(handleNetworkError);
}

export const sendForgotPasswordThunk = (mail: string) => (dispatch: AppDispatch) => {
  sendForgotPasswordAPI(mail)
  .then(checkResponse)
  .then(data => {
    dispatch(sendPasswordForgot())
    alert(`Пароль был выслан на почту ${mail}`)
    return data
  })
  .catch(handleNetworkError)
}

export const sendResetPasswordThunk = (password: string, code: string) => (dispatch: AppDispatch) => {
  sendResetPasswordAPI(password, code)
  .then(checkResponse)
  .then(data => {
    dispatch(sendPasswordReset())
    alert('Пароль был успешно обновлен')
    return data
  })
  .catch(handleNetworkError)
}