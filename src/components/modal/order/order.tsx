import { serverResponseOnOrder } from '../../../utils/prop-types';
import styles from './order.module.css';

export const OrderDetails = ({
  orderDetails,
}: {
  orderDetails: number | null;
}) => (
  <div className={styles.card} onClick={(e) => e.stopPropagation()}>
    <h1 className={styles.id}>{orderDetails}</h1>
    <div className={styles.title}>идентификатор заказа</div>
    <div className={styles.status}>
      <div className={styles.statusWrapper}>
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M43.3122 10.5959C44.1999 11.4172 44.2327 12.7806 43.3852 13.641L20.0519 37.3333C19.6272 37.7646 19.0371 38.0059 18.422 37.9999C17.8069 37.9939 17.222 37.741 16.8063 37.3016L4.58411 24.3785C3.7548 23.5016 3.81592 22.1392 4.72062 21.3354C5.62533 20.5316 7.03104 20.5908 7.86035 21.4677L18.4773 32.6934L40.1703 10.6667C41.0177 9.80621 42.4244 9.77451 43.3122 10.5959Z'
            fill='#F2F2F3'
          />
        </svg>
      </div>
    </div>
    <div className={styles.message}>Ваш заказ начали готовить</div>
    <div className={styles.subMessage}>
      Дождитесь готовности на орбитальной станции
    </div>
  </div>
);
