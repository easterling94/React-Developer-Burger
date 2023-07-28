import { AppHeader } from '../app-header/app-header';
import { Main } from './main';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { getDataThunk } from '../../store/thunks/requestIngredients';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.scss';
import { Profile } from '../profile';
import { PATHS } from '../../utils/consts';
import { getCookie } from '../../utils/cookie';
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
} from '../../pages';
import { sendGetUserThunk } from '../../store/thunks/user';
import { handleModal } from '../../store/slices/ingredientsSlice';
import { Modal } from '../modal';
import { ModalIngredient } from '../modal/ingredients/ingredient';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');

  
  useEffect(() => {
    dispatch(getDataThunk());
    if(accessToken) {
      dispatch(sendGetUserThunk())
    }
  }, [dispatch, accessToken])
  
  let background = location.state && location.state.background;

  const closeModal = () => {
    dispatch(handleModal());
    return navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background}>
        <Route path={PATHS.home} element={<Main />}>
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.register} element={<RegisterPage />} />
          <Route path={PATHS.passwordForgot} element={<PasswordForgotPage />} />
          <Route path={PATHS.passwordReset} element={<PasswordResetPage />} />
          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route path={PATHS.profile} element={<ProtectedRoute element={<Profile />} />}>
            <Route path={PATHS.profileInfo} element={<ProtectedRoute element={<ProfileInfoPage />} />}/>
            <Route path={PATHS.profileOrders} element={<ProtectedRoute element={<ProfileOrdersPage />} />}/>
            <Route path={PATHS.profileLogout} element={<ProtectedRoute element={<ProfileLogoutPage />} />}/>
          </Route>
          <Route path={PATHS.error} element={<ErrorPage />} />
        </Route>
      </Routes>
      {
        background && (
          <Routes>
            <Route path='ingredients/:id' element={
            <Modal closeModal={closeModal}>
              <ModalIngredient />
            </Modal>
            }/>
          </Routes>
        )
      }
    </div>
  );
}

export default App;
