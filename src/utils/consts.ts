import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconTypesObj } from './sharedTypes';
import { wsName } from '../store/slices/wsSlice';

export const ICON_TYPES: TIconTypesObj = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  success: 'success'
};

export const INGREDIENTS_TYPES = [
  {
    type: 'bun',
    name: 'Булки'
  },
  {
    type: 'main',
    name: 'Начинки'
  },
  {
    type: 'sauce',
    name: 'Соусы'
  }
];

export enum CONSTRUCTOR_ITEM_POSITIONS {
  top ='top',
  bottom = 'bottom',
  notBun = 'notBun',
};

export const PATHS = {
  HOME: '/',
  FEED: '/feed',
  INGREDIENTS: '/ingredients',
  PROFILE: '/profile',
  PROFILEINFO: '/profile',
  PROFILEORDERS: '/profile/orders',
  PROFILELOGOUT: '/profile/logout',
  LOGIN: '/login',
  REGISTER: '/register',
  PASSWORDFORGOT: '/forgot-password',
  PASSWORDRESET: '/reset-password',
  error: '*'
};

export const HEADER_TABS = {
  constructor: {
    name: 'Конструктор',
    link: PATHS.HOME,
    icon: BurgerIcon,
  },
  feed: {
    name: 'Лента заказов',
    link: PATHS.FEED,
    icon: ListIcon,
  },
  profile: {
    name: 'Личный кабинет',
    link: PATHS.PROFILEINFO,
    icon: ProfileIcon,
  }
};

export const WS_TYPES = {
  WS_START: wsName + '/wsStart',
  WS_ERROR: wsName + '/wsError',
  WS_CLOSE: wsName + '/wsClose',
  WS_MESSAGE: wsName + '/wsMessage',
}