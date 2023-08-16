import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconTypesObj } from './sharedTypes';

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
  orders: '/orders',
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
  orders: {
    name: 'Лента заказов',
    link: PATHS.orders,
    icon: ListIcon,
  },
  profile: {
    name: 'Личный кабинет',
    link: PATHS.profileInfo,
    icon: ProfileIcon,
  }
};