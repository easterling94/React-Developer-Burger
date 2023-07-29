import { NavLink, useLocation } from 'react-router-dom';
import { ICON_TYPES } from '../../utils/consts';
import { HEADER_TABS } from '../../utils/consts';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../store/store';
import styles from './header.module.scss';

export const HeaderTab = ({ type }) => {
  const location = useLocation().pathname;
  const userName = useAppSelector(store => store.user.user)
  const headerPath = type.link;
  const state = 
    location === headerPath ? 
    true : 
    (location.match(/^\/.+?(?=\/)/) && location.match(/^\/.+?(?=\/)/)[0] === headerPath) ? 
      true : 
      false;

  const Icon = type.icon;
  return (
    <NavLink to={type.link} className={({ isActive }) =>
      isActive ? `${styles.linkPrimary}` : `${styles.linkSecondary}`
    }>
      <div className={styles.block}>
        <Icon type={state ? ICON_TYPES.primary : ICON_TYPES.secondary}/>
        {type !== HEADER_TABS.profile ? type.name : userName ? userName.name : type.name}
      </div>
    </NavLink>    
  )
}

HeaderTab.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  })
}