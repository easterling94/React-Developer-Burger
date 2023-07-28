import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { changeInputThunk, submitFormThunk } from '../../store/thunks/form';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './form.module.scss';

export const Form = ({ title, inputs, buttonTitle, hints }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const onChange = (e) => {
    dispatch(changeInputThunk(e))
  };

  const onSubmit = (e) => {
    dispatch(submitFormThunk(e, location.pathname))
  };

  const form = useAppSelector(state => state.form);

  return (
    <form className={styles.form}>
      <h3 className={styles.title}>{title}</h3>
      {
        inputs.map(input => (
          input.type === Input.password ?
           <PasswordInput
            key={input.id}
            name={input.name}
            value={form.password}
            type={input.type}
            placeholder={input.placeholder}
            onChange={onChange}
            extraClass={styles.input}
            />
           : 
           <Input
            key={input.id}
            name={input.name}
            value={form[input.name]}
            type={input.type}
            placeholder={input.placeholder}
            onChange={onChange}
            extraClass={styles.input}
            />
          )
        )
      }
      <Button 
        htmlType="submit"
        type="primary"
        size="medium"
        onClick={onSubmit}
        extraClass={styles.button}
      >
        {buttonTitle}
      </Button>
      {
        hints.map(hint => (
          <div key={hint.id} className={styles.redirect}>
            <span>{hint.question}</span>
            <Link to={hint.link}>{hint.answer}</Link>
          </div>
          )
        )
      }
    </form>
  )
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.any.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  hints: PropTypes.any.isRequired,
}