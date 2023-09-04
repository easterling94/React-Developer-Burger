import { useAppSelector } from '../../store/store';
import { Navigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/consts';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  element: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  element,
}: TProtectedRoute) => {
  const token = getCookie('accessToken');

  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    console.log('PROTECTED ROUTE', user);
  }, []);

  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} />;
  }

  if (!onlyUnAuth && user) {
    return <>{element}</>;
  }
  return <>{element}</>;
};
