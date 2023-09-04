import { AppDispatch, RootState } from '../store';
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
  updateUser, 
  logoutUser,
  passwordReset,
  checkUser,
} from '../slices/userSlice';

import {
  getCookie,
  setCookie,
} from '../../utils/cookie';
import { closeModal } from '../slices/orderSlice';

export const sendRegisterRequestThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  sendRegisterRequestAPI(name, email, password)
  .then(data => {
    const authToken = data.accessToken.split('Bearer ')[1];
    const refreshToken = data.refreshToken;
    setCookie('accessToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(updateUser(data.user))
    return data
  })
  .catch(() => 'Проблемы с сетью');
}

export const sendLoginUserThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  sendLoginUserAPI(email, password)
  .then(data => {
    const authToken = data.accessToken.split('Bearer ')[1];
    const refreshToken = data.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', authToken);
    dispatch(updateUser(data.user));
    dispatch(closeModal());
    return data
  })
  .catch(() => 'Проблемы с сетью');
}

export const sendGetUserThunk = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    const data = await sendGetUserAPI();
    if(!data.success) return
    dispatch(checkUser(true));
    dispatch(updateUser(data.user));
  }
}


export const sendUpdateUserThunk = (name: string, email: string) => (dispatch: AppDispatch) => {
  sendUpdateUserAPI(name, email)
  .then(data => {
    dispatch(updateUser({
        name: name,
        email: email,
      }))
    alert('Данные пользователя успешно обновились')
    return data
  })
}

export const sendLogoutUserThunk = () => (dispatch: AppDispatch) => {
  sendLogoutUserAPI()
  .then(data => {
    setCookie('accessToken', null, { expires: -1 })
    localStorage.removeItem('refreshToken')
    alert('Вы успешно вышли из аккаунта')
    return data
  })
  .catch(() => 'Проблемы с сетью');
  dispatch(logoutUser())
}

export const sendForgotPasswordThunk = (email: string) => (dispatch: AppDispatch) => {
  sendForgotPasswordAPI(email)
  .then(data => {
    alert(`Пароль был выслан на почту ${email}`)
    dispatch(passwordReset());
    return data
  })
  .catch(() => 'Проблемы с сетью')
}

export const sendResetPasswordThunk = (password: string, code: string) => (dispatch: AppDispatch) => {
  sendResetPasswordAPI(password, code)
  .then(data => {
    alert('Пароль был успешно обновлен')
    dispatch(passwordReset());
    return data
  })
  .catch(() => 'Проблемы с сетью')
}