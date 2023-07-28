import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { submitFormThunk } from '../../store/thunks/form';
import { Name } from '../../utils/form';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { changeInputThunk } from '../../store/thunks/form';
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom';

export const ProfileInfo = () => {
  const form = useAppSelector(store => store.form);
  const dispatch = useAppDispatch();
  const location = useLocation()

  useEffect(() => {
    dispatch(changeInputThunk())
  }, [])

  
  const changeName = (e) => {
    dispatch(changeInputThunk(e));
  }
  const changeEmail = (e) => {
    dispatch(changeInputThunk(e));
  }
  const changePassword = (e) => {
    dispatch(changeInputThunk(e));
  }
  const onReset = (e) => {
    e.preventDefault();
    dispatch(changeInputThunk())
  };
  const onSubmit = (e) => {
    dispatch(submitFormThunk(e, location.pathname))
  }
  return (
    <div>
      <Input name={Name.name} type='text' placeholder='Имя' value={form.name} icon='EditIcon' onChange={changeName} extraClass={styles.input}/>
      <Input name={Name.email} type='email' placeholder='Логин' value={form.email} icon='EditIcon' onChange={changeEmail} extraClass={styles.input}/>
      <Input name={Name.password} type='password' placeholder='Пароль' value={form.password} icon='EditIcon' onChange={changePassword} extraClass={styles.input}/>
      <div className={styles.buttons}>
        <Button htmlType='reset' type="primary" size="small" extraClass={styles.button} onClick={onReset}>Вернуть</Button>
        <Button htmlType='submit' type="primary" size="small" extraClass={styles.button} onClick={onSubmit}>Сохранить</Button>
      </div>
    </div>
  )
}