import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header.module.scss'

const TYPE = ['primary', 'secondary', 'error', 'success']
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

function HeaderTab ({title, icon, type}) {
  const MyComponent = icon;
  return (
    <a href='/' className={type === TYPE[0] ? styles.linkPrimary : styles.linkSecondary}>
      <div className={styles.block}>
        <MyComponent type={type}/>
        {title}
      </div>
    </a>    
  )
}