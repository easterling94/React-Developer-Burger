import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/consts';
import { usePrepareOrderFeed } from '../../../hooks/usePrepareOrderFeed';
import { OrderImagesList } from './order-images-list';
import { useAppDispatch } from '../../../store/store';
import { wsHandleModal } from '../../../store/slices/wsSlice';
import { OrderFeed } from '../../../utils/sharedTypes';
import styles from './index.module.scss';

type TFeedItem = {
  order: OrderFeed;
  background: 'feed' | 'profile' | null;
};

export const FeedItem = ({ order, background }: TFeedItem) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(wsHandleModal(true));
  };
  const location = useLocation();
  const { totalPrice, images, namePrepared } = usePrepareOrderFeed(order);
  const link =
    background === 'feed'
      ? `${PATHS.feed}/${order._id}`
      : `${PATHS.profileOrders}/${order._id}`;
  const state =
    background === 'feed'
      ? { locationProfileFeed: location }
      : { locationProfileOrders: location };
  const status =
    order.status === 'done'
      ? 'Выполнен'
      : order.status === 'pending'
      ? 'Готовится'
      : order.status === 'created'
      ? 'Создан'
      : null;
  return images ? (
    <div className={`${styles.order}`} onClick={handleClick}>
      <Link className={styles.link} to={link} state={state}>
        <div className={styles.meta}>
          <p className={styles.number}>#{order.number}</p>
          <p className={styles.date}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <h3 className={styles.name}>{namePrepared}</h3>
        {background === 'profile' ? (
          status === 'Выполнен' ? (
            <p style={{ color: '#0CC' }}>{status}</p>
          ) : (
            <p>{status}</p>
          )
        ) : null}
        <div className={styles.info}>
          <OrderImagesList images={images} />
          <p className={styles.price}>
            {totalPrice} <CurrencyIcon type='primary' />
          </p>
        </div>
      </Link>
    </div>
  ) : null;
};
