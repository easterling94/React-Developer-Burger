import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './app-header.module.css'

const HeaderItem = ({id, icon, name, changeMode, type}) => {
  return (
    <div id={id} className={styles.element} onClick={(e) => changeMode(e)}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.name} style={type === 'primary' ? {color:'#F2F2F3'} : {color:'#8585AD'}}>{name}</div>
    </div>
  )
}

const AppHeader = ({mode, changeMode}) => {

  let currentMode = mode;
  const [modeChosen, setModeChosen] = useState({})
  const changeModeF = () => {
    setModeChosen({
      constructor: currentMode === 'constructor' ? 'primary' : 'secondary',
      orders: currentMode === 'orders' ? 'primary' : 'secondary',
      cabinet: currentMode === 'cabinet' ? 'primary' : 'secondary'
    })
  }

  useEffect(() => {
    changeModeF();
  },[mode])

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation}`}>
        <div className={styles.mode}>
          <HeaderItem id='constructor' icon={<BurgerIcon type={modeChosen.constructor}/>} name='Конструктор' changeMode={changeMode} type={modeChosen.constructor}/>
          <HeaderItem id='orders' icon={<ListIcon type={modeChosen.orders}/>} name='Лента заказов' changeMode={changeMode} type={modeChosen.orders}/>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.cabinet}>
          <HeaderItem id='cabinet' icon={<ProfileIcon type={modeChosen.cabinet}/>} name='Личный кабинет' changeMode={changeMode} type={modeChosen.cabinet}/>
        </div>
      </nav>
    </header>
  )
}

HeaderItem.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  type: PropTypes.any
}

AppHeader.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired
}

export default AppHeader