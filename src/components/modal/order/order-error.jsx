import styles from './order.module.css';

export const OrderError = () => {
  return (
    <div className={styles.card} onClick={(e) => e.stopPropagation()}>
      <h1 className={styles.message}>Произошла ошибка при отправке заказа</h1>
    </div>
  )
}