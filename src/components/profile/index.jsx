import { Link, useLocation, Outlet } from 'react-router-dom';
import { PATHS } from '../../utils/consts';
import styles from './index.module.scss';


export const Profile = () => {
  const location = useLocation().pathname;
  return (
    <section className={styles.section}>
      <div>
        <nav className={styles.nav}>
        <Link
          to={{ pathname: PATHS.profileInfo }}
          className={
            location === PATHS.profileInfo ? styles.active: styles.pending
          }
        >
          Профиль
        </Link>
        <Link
          to={{ pathname: PATHS.profileOrders }}
          className={
            location === PATHS.profileOrders ? styles.active: styles.pending
          }
        >
          История заказов
        </Link>
        <Link
          to={{ pathname: PATHS.profileLogout }}
          className={
            location === PATHS.profileLogout ? styles.active: styles.pending
          }
        >
          Выход
        </Link>
        </nav>
        <p className={styles.p}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </section>
  )
}