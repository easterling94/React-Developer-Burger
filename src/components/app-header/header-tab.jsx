import { Link, useLocation } from 'react-router-dom';
import { ICON_TYPES } from '../../utils/consts';
import { HEADER_TABS } from '../../utils/consts';
import { getCookie } from '../../utils/cookie';
import PropTypes from 'prop-types';
import styles from './header.module.scss';

export const HeaderTab = ({ type }) => {
  const userNameCookie = getCookie('name');
  const location = useLocation().pathname;
  const headerPath = type.link;
  const state = 
    location === headerPath ? 
    true : 
    (location.match(/^\/.+?(?=\/)/) && location.match(/^\/.+?(?=\/)/)[0] === headerPath) ? 
      true : 
      false;

  const Icon = type.icon;
  return (
    <Link to={type.link} className={state ? styles.linkPrimary : styles.linkSecondary}>
      <div className={styles.block}>
        <Icon type={state ? ICON_TYPES.primary : ICON_TYPES.secondary}/>
        {type !== HEADER_TABS.profile ? type.name : userNameCookie ? userNameCookie : type.name}
      </div>
    </Link>    
  )
}

HeaderTab.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  })
}