import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppSelector } from '../store/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../utils/consts';

export const LoginPage = () => {
  const user = useAppSelector(store => store.user.user);
  
  const inputs = [
    generateInput({placeholder: 'E-mail', name: Name.email, type: Type.email}),
    generateInput({placeholder: 'Пароль', name: Name.password, type: Type.password}),
  ];

  const hints = [
    generateHint({link: '/register', question: 'Вы — новый пользователь?', answer: 'Зарегистрироваться'}),
    generateHint({link: '/forgot-password', question: 'Забыли пароль?', answer: 'Восстановить пароль'}),
  ];

  return (
      user ? 
      <Navigate to={PATHS.home} replace />
      :
      <Form title='Вход' inputs={inputs} buttonTitle='Вход' hints={hints}/>
    
  )
}