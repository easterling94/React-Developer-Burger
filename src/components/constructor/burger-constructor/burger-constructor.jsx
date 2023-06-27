import { Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from './item'
import { useCallback } from 'react'
import data from '../../utils/data.json'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = () => {

  const totalCostEval = useCallback(() => {
    return data.reduce((acc, current) => acc + current.price, 0)
  }, [data])

  const handleOrder = () => {}
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        {
          data.map((item, i) => {
            const position = i === 0 ? 'top' : i === data.length - 1 ? 'bottom' : undefined;
            return (<Item key={item._id} item={item} type={position} i={i}/>)
            }
          )
        }
      </div>
      <div className={styles.summary}>
        <div className={styles.costs}>
          <span>{totalCostEval()}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='medium' onClick={handleOrder} htmlType='button'>Оформить заказ</Button>
      </div>
    </section>
  )
}