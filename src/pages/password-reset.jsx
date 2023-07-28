import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppSelector } from '../store/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../utils/consts';

export const PasswordResetPage = () => {
  const user = useAppSelector(store => store.user.user);
  const reset = useAppSelector(store => store.user.requestPasswordResetSuccess);

  const inputs = [
    generateInput({placeholder: 'Введите новый пароль', name: Name.password, type: Type.password}),
    generateInput({placeholder: 'Введите код из письма', name: Name.code, type: Type.text})
  ]

  const hints = [
    generateHint({link: '/login', question: 'Вспомнили пароль?', answer: 'Войти'})
  ]
  return (
    user ? 
    <Navigate to={PATHS.home} replace />
    :
    !reset ?
    <Form title='Восстановление пароля' inputs={inputs} buttonTitle='Сохранить' hints={hints}/>
    :
    <Navigate to={PATHS.profile} replace />
  )
}