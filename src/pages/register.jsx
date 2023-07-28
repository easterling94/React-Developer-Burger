import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppSelector } from '../store/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../utils/consts';

export const RegisterPage = () => {
  const user = useAppSelector(store => store.user.user);

  const inputs = [
    generateInput({placeholder: 'Имя', name: Name.name, type: Type.text}),
    generateInput({placeholder: 'E-mail', name: Name.email, type: Type.email}),
    generateInput({placeholder: 'Пароль', name: Name.password, type: Type.password}),
  ]

  const hints = [
    generateHint({link: '/login', question: 'Уже зарегистрированы?', answer: 'Войти'})
  ]
  return (
    user ? 
    <Navigate to={PATHS.home} replace />
    :
    <Form title='Регистрация' inputs={inputs} buttonTitle='Зарегистрироваться' hints={hints}/>
  )
}