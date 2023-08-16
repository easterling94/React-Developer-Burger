import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, SyntheticEvent } from 'react';
import { submitFormThunk } from '../../store/thunks/form';
import { Name } from '../../utils/form';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { changeInputThunk } from '../../store/thunks/form';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';

export const ProfileInfo = () => {
  const form = useAppSelector((store) => store.form);
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    dispatch(changeInputThunk());
  }, []);

  useEffect(() => {
    if (
      form.name !== user!.name ||
      form.email !== user!.email ||
      form.password !== ''
    ) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [form, user]);

  const changeName = (e: SyntheticEvent) => {
    dispatch(changeInputThunk(e));
  };
  const changeEmail = (e: SyntheticEvent) => {
    dispatch(changeInputThunk(e));
  };
  const changePassword = (e: SyntheticEvent) => {
    dispatch(changeInputThunk(e));
  };
  const onReset = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeInputThunk());
  };
  const onSubmit = (e: SyntheticEvent) => {
    dispatch(submitFormThunk(e, location.pathname));
  };
  return (
    <div>
      <Input
        name={Name.name}
        type='text'
        placeholder='Имя'
        value={form.name}
        icon='EditIcon'
        onChange={changeName}
        extraClass={styles.input}
      />
      <Input
        name={Name.email}
        type='email'
        placeholder='Логин'
        value={form.email}
        icon='EditIcon'
        onChange={changeEmail}
        extraClass={styles.input}
      />
      <Input
        name={Name.password}
        type='password'
        placeholder='Пароль'
        value={form.password}
        icon='EditIcon'
        onChange={changePassword}
        extraClass={styles.input}
      />
      <div className={styles.buttons}>
        {hasChanged ? (
          <>
            <Button
              htmlType='reset'
              type='primary'
              size='small'
              extraClass={styles.button}
              onClick={onReset}
            >
              Вернуть
            </Button>
            <Button
              htmlType='submit'
              type='primary'
              size='small'
              extraClass={styles.button}
              onClick={onSubmit}
            >
              Сохранить
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};
