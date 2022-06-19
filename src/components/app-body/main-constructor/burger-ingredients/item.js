import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './item.module.css'

const IngredientItem = ({item}) => {
  const [count, setCounter] = useState(0);
  const changeCounter = () => {
    setCounter(prevCurrent => prevCurrent + 1)
  }
  return (
    <div className={styles.item} onClick={changeCounter}>
      <img src={item.image} alt={`Изображение ${item.name}`}></img>
      <Counter className={styles.counter} count={count} size={count < 10 ? 'default' : 'small'}/>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{item.price}
          <CurrencyIcon type='primary'/>
        </span>
      </div>
      <p className={styles.name}>{item.name}</p>
    </div>
  )
}



export default IngredientItem