import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { PATHS } from '../../utils/consts';
import styles from './index.module.scss';

export const Profile = () => {
  const location = useLocation().pathname;
  return (
    <section className={styles.section}>
      <div>
        <nav className={styles.nav}>
          <NavLink
            to={{ pathname: PATHS.PROFILEINFO }}
            className={
              location === PATHS.PROFILEINFO ? styles.active : styles.pending
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={{ pathname: PATHS.PROFILEORDERS }}
            className={
              location === PATHS.PROFILEORDERS ? styles.active : styles.pending
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={{ pathname: PATHS.PROFILELOGOUT }}
            className={
              location === PATHS.PROFILELOGOUT ? styles.active : styles.pending
            }
          >
            Выход
          </NavLink>
        </nav>
        <p className={styles.p}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </section>
  );
};
