import PropTypes from 'prop-types'
import { ICON_TYPES } from '../../utils/consts'
import styles from './header.module.scss'

export const HeaderTab = ({title, icon, type}) => {
  const MyComponent = icon;
  return (
    <a href='/' className={type === ICON_TYPES.primary ? styles.linkPrimary : styles.linkSecondary}>
      <div className={styles.block}>
        <MyComponent type={type}/>
        {title}
      </div>
    </a>    
  )
}

HeaderTab.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  type: PropTypes.string.isRequired,
}