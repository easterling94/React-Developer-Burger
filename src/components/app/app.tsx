import { AppHeader } from '../app-header/app-header';
import { Main } from './main';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getDataThunk } from '../../store/thunks/requestIngredients';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.scss';
import { Profile } from '../profile';
import { PATHS } from '../../utils/consts';
import { ProtectedRoute } from '../protected-route';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  PasswordForgotPage,
  PasswordResetPage,
  ProfileInfoPage,
  ProfileLogoutPage,
  ProfileOrdersPage,
  ErrorPage,
  IngredientPage,
  FeedPage,
  OrderPage,
} from '../../pages';
import { sendGetUserThunk } from '../../store/thunks/user';
import { handleModal } from '../../store/slices/ingredientsSlice';
import { wsHandleModal } from '../../store/slices/wsSlice';
import { Modal } from '../modal';
import { ModalIngredient } from '../modal/ingredients/ingredient';
import { OrderHistory } from '../modal/order-history/order-history';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background =
    location.state?.ingredientPage ||
    location.state?.locationProfileFeed ||
    location.state?.locationProfileOrders ||
    location;

  useEffect(() => {
    dispatch(sendGetUserThunk());
    if (background) {
      dispatch(getDataThunk(location.pathname.slice(13)));
    } else {
      dispatch(getDataThunk());
    }
  }, [dispatch]);

  const closeModal = (): void => {
    dispatch(handleModal(false));
    dispatch(wsHandleModal(false));
    navigate(-1);
    return;
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background}>
        <Route path={PATHS.HOME} element={<Main />}>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.FEED} element={<FeedPage />} />
          <Route
            path={`${PATHS.FEED}/:id`}
            element={<OrderPage type='feed' />}
          />
          <Route
            path={`${PATHS.INGREDIENTS}/:id`}
            element={<IngredientPage />}
          />
          <Route
            path={PATHS.LOGIN}
            element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />}
          />
          <Route
            path={PATHS.REGISTER}
            element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />}
          />
          <Route
            path={PATHS.PASSWORDFORGOT}
            element={
              <ProtectedRoute onlyUnAuth element={<PasswordForgotPage />} />
            }
          />
          <Route
            path={PATHS.PASSWORDRESET}
            element={
              <ProtectedRoute onlyUnAuth element={<PasswordResetPage />} />
            }
          />
          {}
          <Route
            path={PATHS.PROFILE}
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route
              path={PATHS.PROFILEINFO}
              element={<ProtectedRoute element={<ProfileInfoPage />} />}
            />
            <Route
              path={PATHS.PROFILEORDERS}
              element={<ProtectedRoute element={<ProfileOrdersPage />} />}
            />
            <Route
              path={`${PATHS.PROFILEORDERS}/:id`}
              element={
                <ProtectedRoute element={<OrderPage type='profile' />} />
              }
            />
            <Route
              path={PATHS.PROFILELOGOUT}
              element={<ProtectedRoute element={<ProfileLogoutPage />} />}
            />
          </Route>
          <Route path={PATHS.error} element={<ErrorPage />} />
        </Route>
      </Routes>
      {location.state?.ingredientPage && (
        <Routes>
          <Route
            path={`${PATHS.INGREDIENTS}/:id`}
            element={
              <Modal closeModal={closeModal}>
                <ModalIngredient />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.locationProfileFeed && (
        <Routes>
          <Route
            path={`${PATHS.FEED}/:id`}
            element={
              <Modal closeModal={closeModal}>
                <OrderHistory />
              </Modal>
            }
          />
        </Routes>
      )}
      {location.state?.locationProfileOrders && (
        <Routes>
          <Route
            path={`${PATHS.PROFILEORDERS}/:id`}
            element={
              <Modal closeModal={closeModal}>
                <OrderHistory />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
