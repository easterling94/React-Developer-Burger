import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderTab } from './header-tab'
import { TYPE } from '../utils/consts'
import styles from './header.module.scss'

const ICON = [BurgerIcon, ListIcon, ProfileIcon]

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftBlock}>
          <HeaderTab title='Конструктор' icon={ICON[0]} type={TYPE[0]}/>
          <HeaderTab title='Лента заказов' icon={ICON[1]} type={TYPE[1]}/>
        </div>
        <div className={styles.centerBlock}>
          <Logo />
        </div>
        <HeaderTab title='Личный кабинет' icon={ICON[2]} type={TYPE[1]}/>
      </nav>
    </header>
  )
}