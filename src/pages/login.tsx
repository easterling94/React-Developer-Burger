import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useEffect } from 'react';

export const LoginPage = () => {
  useEffect(() => {
    console.log('LOGIN');
  }, []);
  const inputs = [
    generateInput({
      placeholder: 'E-mail',
      name: Name.email,
      type: Type.email,
    }),
    generateInput({
      placeholder: 'Пароль',
      name: Name.password,
      type: Type.password,
    }),
  ];

  const hints = [
    generateHint({
      link: '/register',
      question: 'Вы — новый пользователь?',
      answer: 'Зарегистрироваться',
    }),
    generateHint({
      link: '/forgot-password',
      question: 'Забыли пароль?',
      answer: 'Восстановить пароль',
    }),
  ];

  return <Form title='Вход' inputs={inputs} buttonTitle='Вход' hints={hints} />;
};
