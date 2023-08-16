import { Form } from '../components/form/form';
import { generateInput, Name, Type, generateHint } from '../utils/form';

export const RegisterPage = () => {
  const inputs = [
    generateInput({placeholder: 'Имя', name: Name.name, type: Type.text}),
    generateInput({placeholder: 'E-mail', name: Name.email, type: Type.email}),
    generateInput({placeholder: 'Пароль', name: Name.password, type: Type.password}),
  ]

  const hints = [
    generateHint({link: '/login', question: 'Уже зарегистрированы?', answer: 'Войти'})
  ]
  return (
    <Form title='Регистрация' inputs={inputs} buttonTitle='Зарегистрироваться' hints={hints}/>
  )
}