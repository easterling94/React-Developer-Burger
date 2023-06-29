import { JumpingDots } from '../../loader/loader-animation';
import styles from './order.module.css'
export const OrderLoader = () => {
  return (
    <div className={styles.card} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.message}>Отправляем заказ на сервер...</h1>
      <JumpingDots />
    </div>
  )
}