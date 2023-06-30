import { ingredientsPropsTypes } from '../../../utils/prop-types'
import { useState } from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from '../../modal'
import { ModalIngredients } from '../../modal/ingredients/ingredients'
import styles from './burger-ingredients.module.scss'

export const Item = ({item}) => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setModalIsOpened(true);
  }

  const closeModalState = () => {
    setModalIsOpened(!modalIsOpened)
  }

  return (
    <div className={styles.item}>
      {
        modalIsOpened ? 
          <Modal closeModal={closeModalState}>
            <ModalIngredients item={item}/>
          </Modal>
        : null
      }
      <Counter className={styles.counter} count={count} size={count < 10 ? 'default' : 'small'}/>
      <img alt={item.name} src={item.image} className={styles.img} onClick={handleClick}/>
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
  item: ingredientsPropsTypes.isRequired,
}