import { SyntheticEvent } from 'react';
import { Name } from '../../utils/form';
import { AppDispatch, RootState } from '../store';
import { updateForm } from '../slices/formSlice';
import { PATHS } from '../../utils/consts';
import { 
  sendRegisterRequestThunk,
  sendLoginUserThunk,
  sendForgotPasswordThunk,
  sendResetPasswordThunk,
  sendUpdateUserThunk,
} from './user';

interface name {
  name: Name;
};

export const changeInputThunk = (e?: SyntheticEvent) => (dispatch: AppDispatch, getState: () => RootState): void => {
  if(e) {
    const element = (e.target as HTMLInputElement & name);
    if(Object.values(Name).includes(element.name)) {
      dispatch(updateForm({
        name: element.name,
        value: element.value,
      }))
    } return
  } else {
    const user = getState().user.user;
    dispatch(updateForm({
      name: Name.name,
      value: user!.name,
    }))
    dispatch(updateForm({
      name: Name.email,
      value: user!.email,
    }))
    dispatch(updateForm({
      name: Name.password,
      value: '',
    }))
  }
}

export const submitFormThunk = (e: SyntheticEvent, location: string) => (dispatch: AppDispatch, getState: () => RootState): void => {
  e.preventDefault();
  const { name, email, password, code} = getState().form;
  switch(location) {
    case PATHS.REGISTER:
      dispatch(sendRegisterRequestThunk(name, email, password));
      return
    case PATHS.LOGIN:
      dispatch(sendLoginUserThunk(email, password));
      return
    case PATHS.PASSWORDFORGOT:
      dispatch(sendForgotPasswordThunk(email))
      return
    case PATHS.PASSWORDRESET:
      dispatch(sendResetPasswordThunk(password, code))
      return
    case PATHS.PROFILE:
      dispatch(sendUpdateUserThunk(name, email))
  }
}