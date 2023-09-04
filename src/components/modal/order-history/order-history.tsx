import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { OrderFeed } from '../../../utils/sharedTypes';
import { usePrepareOrderFeed } from '../../../hooks/usePrepareOrderFeed';
import styles from './order-history.module.scss';

export const OrderHistory = () => {
  const { id } = useParams();
  const data = useAppSelector((store) => store.websocket.data?.orders);
  const order = data?.filter((order: OrderFeed) => order?._id === id)[0];
  const { orderIngredients, totalPrice, images, namePrepared } =
    usePrepareOrderFeed(order);

  return order && orderIngredients ? (
    <div className={styles.card} onClick={(e) => e.stopPropagation()}>
      <p className={styles.number}>{`#${order.number}`}</p>
      <h4 className={styles.name}>{`${namePrepared}`}</h4>
      <p className={styles.status}>
        {order?.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>
      <p className={styles.compose}>Состав:</p>
      <div className={styles.itemsList}>
        {orderIngredients.map((el, i) => (
          <div key={i} className={styles.container}>
            <div className={styles.containerInfo}>
              <div className={styles.imageBorder}>
                <img
                  src={images[i].source}
                  alt={images[i].alt}
                  className={styles.image}
                ></img>
              </div>
              <p className={styles.ingredientName}>{el.name}</p>
            </div>
            <div className={styles.price}>
              <p className={styles.totalPrice}>
                {el.type === 'bun' ? '2 x ' : '1 x '}
                {el.price}
              </p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.meta}>
        <p className={styles.date}>
          {order && <FormattedDate date={new Date(order.createdAt)} />}
        </p>
        <div className={styles.price}>
          <p className={styles.totalPrice}>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  ) : (
    <>НЕТ</>
  );
};
