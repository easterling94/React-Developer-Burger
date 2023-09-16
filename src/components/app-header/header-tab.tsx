import { NavLink, useLocation } from 'react-router-dom';
import { ICON_TYPES } from '../../utils/consts';
import { HEADER_TABS } from '../../utils/consts';
import { useAppSelector } from '../../store/store';
import styles from './header.module.scss';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type Tab = {
  type: {
    name: string;
    link: string;
    icon: ({ type }: TIconProps) => JSX.Element;
  };
};

export const HeaderTab = ({ type }: Tab) => {
  const location = useLocation().pathname;
  const userName = useAppSelector((store) => store.user.user);
  const headerPath = type.link;
  const state =
    location === headerPath
      ? true
      : location.match(/^\/.+?(?=\/)/) &&
        location.match(/^\/.+?(?=\/)/)![0] === headerPath
      ? true
      : false;

  const Icon = type.icon;
  return (
    <NavLink
      to={type.link}
      className={({ isActive }) =>
        isActive ? `${styles.linkPrimary}` : `${styles.linkSecondary}`
      }
      data-cy={`tab-${type.name}`}
    >
      <div className={styles.block}>
        <Icon type={state ? ICON_TYPES.primary : ICON_TYPES.secondary} />
        {type !== HEADER_TABS.profile
          ? type.name
          : userName
          ? userName.name
          : type.name}
      </div>
    </NavLink>
  );
};
