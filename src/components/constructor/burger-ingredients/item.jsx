import PropTypes from 'prop-types'
import { ingredientsPropsTypes } from '../../utils/prop-types'
import { useState } from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.scss'

export const Item = ({item}) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div className={styles.item} onClick={handleClick}>
      <Counter className={styles.counter} count={count} size={count < 10 ? 'default' : 'small'}/>
      <img alt={item.name} src={item.image} className={styles.img}/>
      <p className={styles.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary'/>
      </p>
      <p className={styles.name}>
        {item.name}
      </p>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape(ingredientsPropsTypes.isRequired).isRequired,
}