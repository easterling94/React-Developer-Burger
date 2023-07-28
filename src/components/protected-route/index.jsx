import { useAppSelector } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/consts';
import { useAppDispatch } from '../../store/store';
import { sendGetUserThunk } from '../../store/thunks/user';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const ProtectedRoute = ({allowIfNotAuth = false, element}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(sendGetUserThunk());
  }, [])

  const user = useAppSelector((store) => store.user.user);
  

  if (!allowIfNotAuth && !user) {
    return <Navigate to={PATHS.login} />;
  }

  return element;
}

ProtectedRoute.propTypes = {
  allowIfNotAuth: PropTypes.bool,
  element: PropTypes.element.isRequired,
}