import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Navigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/consts';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  element: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  element,
}: TProtectedRoute) => {
  const { user, userAuthorized } = useAppSelector((store) => store.user);

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
