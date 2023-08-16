import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../utils/consts';
import { useEffect } from 'react';

export const PasswordForgotPage = () => {
  const { passwordReset }= useAppSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (passwordReset) {
      navigate(PATHS.passwordReset)
    } else return
  }, [passwordReset])

  const inputs = [
    generateInput({placeholder: 'E-mail', name: Name.email, type: Type.email})
  ]

  const hints = [
    generateHint({link: '/login', question: 'Вспомнили пароль?', answer: 'Войти'})
  ]
  return (
    <Form title='Восстановление пароля' inputs={inputs} buttonTitle='Восстановить' hints={hints}/>
  )
}