import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../utils/consts';

export const PasswordForgotPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user.user);
  const request = useAppSelector(store => store.user.requestPasswordForgotSuccess);

  const inputs = [
    generateInput({placeholder: 'E-mail', name: Name.email, type: Type.email})
  ]

  const hints = [
    generateHint({link: '/login', question: 'Вспомнили пароль?', answer: 'Войти'})
  ]
  return (
    user ? 
    <Navigate to={PATHS.home} replace />
    :
    !request ?
    <Form title='Восстановление пароля' inputs={inputs} buttonTitle='Восстановить' hints={hints}/>
    :
    <Navigate to={PATHS.passwordReset} replace />
  )
}