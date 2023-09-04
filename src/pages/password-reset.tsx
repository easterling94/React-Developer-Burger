import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PATHS } from '../utils/consts';

export const PasswordResetPage = () => {
  const { passwordReset } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!passwordReset) {
      navigate(PATHS.LOGIN);
    } else return;
  }, [passwordReset]);

  const inputs = [
    generateInput({
      placeholder: 'Введите новый пароль',
      name: Name.password,
      type: Type.password,
    }),
    generateInput({
      placeholder: 'Введите код из письма',
      name: Name.code,
      type: Type.text,
    }),
  ];

  const hints = [
    generateHint({
      link: '/login',
      question: 'Вспомнили пароль?',
      answer: 'Войти',
    }),
  ];
  return (
    <Form
      title='Восстановление пароля'
      inputs={inputs}
      buttonTitle='Сохранить'
      hints={hints}
    />
  );
};
