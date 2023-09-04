import { useMemo } from 'react';
import { useAppSelector } from '../../../store/store';
import { OrderFeed } from '../../../utils/sharedTypes';
import section from '../section.module.scss';
import styles from './index.module.scss';

export const FeedStat = () => {
  const { total, totalToday, orders } = useAppSelector(
    (store) => store.websocket.data
  );

  const ordersReady = useMemo(() => {
    return orders
      .filter((order: OrderFeed) => order.status === 'done')
      .slice(0, 10)
      .map((order: OrderFeed) => order.number);
  }, [orders]);

  const ordersPending = useMemo(() => {
    return orders
      .filter((order: OrderFeed) => order.status === 'pending')
      .slice(0, 10)
      .map((order: OrderFeed) => order.number);
  }, [orders]);

  return (
    <section className={section.section}>
      <div className={styles.itemsList}>
        <div className={styles.orders}>
          <div className={styles.ordersType}>
            <h4 className={styles.header}>Готовы:</h4>
            <ul className={styles.ul}>
              {ordersReady?.map((order: string) => (
                <li key={order} className={styles.ready}>
                  {order}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ordersType}>
            <h4 className={styles.header}>В работе:</h4>
            <ul className={styles.ul}>
              {ordersPending?.map((order: string) => (
                <li key={order} className={styles.pending}>
                  {order}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <p className={styles.headerTotal}>Выполнено за все время:</p>
          <p className={styles.total}>{total}</p>
        </div>
        <div style={{ marginTop: '50px' }}>
          <p className={styles.headerTotal}>Выполнено за сегодня:</p>
          <p className={styles.total}>{totalToday}</p>
        </div>
      </div>
    </section>
  );
};
