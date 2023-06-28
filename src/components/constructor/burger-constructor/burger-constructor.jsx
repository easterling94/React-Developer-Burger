import PropTypes from 'prop-types'
import { ingredientsPropsTypes } from '../../../utils/prop-types'
import { Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from './item'
import { useCallback } from 'react'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = ({ingredients}) => {

  const totalCostEval = useCallback(() => {
    return ingredients.reduce((acc, current) => acc + current.price, 0)
  }, [ingredients])

  const handleOrder = () => {}
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        {
          ingredients.map((item, i) => {
            const position = i === 0 ? 'top' : i === ingredients.length - 1 ? 'bottom' : undefined;
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}