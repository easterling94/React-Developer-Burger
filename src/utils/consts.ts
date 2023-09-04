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
  home: '/',
  feed: '/feed',
  ingredients: '/ingredients',
  profile: '/profile',
  profileInfo: '/profile',
  profileOrders: '/profile/orders',
  profileLogout: '/profile/logout',
  login: '/login',
  register: '/register',
  passwordForgot: '/forgot-password',
  passwordReset: '/reset-password',
  error: '*'
};

export const HEADER_TABS = {
  constructor: {
    name: 'Конструктор',
    link: PATHS.home,
    icon: BurgerIcon,
  },
  feed: {
    name: 'Лента заказов',
    link: PATHS.feed,
    icon: ListIcon,
  },
  profile: {
    name: 'Личный кабинет',
    link: PATHS.profileInfo,
    icon: ProfileIcon,
  }
};

export const WS_TYPES = {
  WS_START: wsName + '/wsStart',
  WS_ERROR: wsName + '/wsError',
  WS_CLOSE: wsName + '/wsClose',
  WS_MESSAGE: wsName + '/wsMessage',
}