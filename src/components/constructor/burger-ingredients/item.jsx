import { ingredientsPropsTypes } from '../../../utils/prop-types'
import { useState, useEffect } from 'react'
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from '../../modal'
import { ModalIngredients } from '../../modal/ingredients/ingredients'
import { useDrag } from 'react-dnd'
import styles from './burger-ingredients.module.scss'
import { useAppSelector } from '../../../store/store'

export const Item = ({item}) => {
  const orderIngredients = useAppSelector(store => store.order.orderIngredients)
  const [count, setCount] = useState(0);
  const [modalIsOpened, setModalIsOpened] = useState(false)

  useEffect(() => {
    setCount(orderIngredients.length ? orderIngredients.filter(el => el._id === item._id).length : 0)
  }, [orderIngredients])


  const [{opacity}, dragRef] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'notBun',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  });

  const handleClick = () => {
    setModalIsOpened(true);
  }

  const closeModalState = () => {
    setModalIsOpened(!modalIsOpened)
  }

  return (
    <div className={styles.item} ref={dragRef} style={{opacity}}>
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