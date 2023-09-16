import { ChangeEvent, FormEvent } from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { changeInputThunk, submitFormThunk } from '../../store/thunks/form';
import { Link, useLocation } from 'react-router-dom';
import { generateInput, generateHint } from '../../utils/form';
import { Type } from '../../utils/form';
import styles from './form.module.scss';

type TForm = {
  title: string;
  inputs: ReturnType<typeof generateInput>[];
  buttonTitle: string;
  hints: ReturnType<typeof generateHint>[];
};

export const Form = ({ title, inputs, buttonTitle, hints }: TForm) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInputThunk(e));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(submitFormThunk(e, location.pathname));
  };

  const form = useAppSelector((state) => state.form);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.title}>{title}</h3>
      {inputs.map((input) =>
        input.type === Type.password ? (
          <PasswordInput
            key={input.id}
            name={input.name}
            value={form.password}
            placeholder={input.placeholder}
            onChange={onChange}
            extraClass={styles.input}
            data-cy='input-password'
          />
        ) : (
          <Input
            key={input.id}
            name={input.name}
            value={form[input.name]}
            type={input.type}
            placeholder={input.placeholder}
            onChange={onChange}
            extraClass={styles.input}
            data-cy={`input-${input.name}`}
          />
        )
      )}
      <Button
        htmlType='submit'
        type='primary'
        size='medium'
        extraClass={styles.button}
        data-cy='submit-form'
      >
        {buttonTitle}
      </Button>
      {hints.map((hint) => (
        <div key={hint.id} className={styles.redirect}>
          <span>{hint.question}</span>
          <Link to={hint.link}>{hint.answer}</Link>
        </div>
      ))}
    </form>
  );
};
