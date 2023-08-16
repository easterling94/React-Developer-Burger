import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderTab } from './header-tab';
import { HEADER_TABS } from '../../utils/consts';
import styles from './header.module.scss';

export const AppHeader = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.leftBlock}>
        <HeaderTab type={HEADER_TABS.constructor}/>
        <HeaderTab type={HEADER_TABS.orders}/>
      </div>
      <div className={styles.centerBlock}>
        <Logo />
      </div>
      <HeaderTab type={HEADER_TABS.profile}/>
    </nav>
  </header>
)