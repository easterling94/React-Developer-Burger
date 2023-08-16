import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  )
}