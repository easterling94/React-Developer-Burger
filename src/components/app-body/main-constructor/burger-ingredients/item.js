import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../../modal/modal';
import IngredientsDetails from '../../../ingredient-details/ingredients-details';
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './item.module.css'

const IngredientItem = ({item}) => {
  const [count, setCounter] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  }

  const closeModal = (e) => {
    if (e === 'Escape' || e.target.id === 'modalOverlay' || e.target.parentElement.id === 'modalCloseBtn' || e.target.parentElement.parentElement.id === 'modalCloseBtn') setIsModalOpened(false);
    return;
  }

  const modalDetails = {
    image: item.image_large,
    name: item.name,
    calories: item.calories,
    proteins: item.proteins,
    fat: item.fat,
    carbohydrates: item.carbohydrates
  }

  return (
    <div className={styles.item}>
      <img src={item.image} alt={`Изображение ${item.name}`} onClick={openModal} className={styles.img}></img>
      <Counter className={styles.counter} count={count} size={count < 10 ? 'default' : 'small'}/>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{item.price}
          <CurrencyIcon type='primary'/>
        </span>
      </div>
      <p className={styles.name}>{item.name}</p>
      {isModalOpened && (
      <Modal header='Детали ингредиента' closeModal={closeModal}>
        <IngredientsDetails data={modalDetails}/>
      </Modal>
      )}
    </div>
  )
}

IngredientItem.propTypes = {
  item: PropTypes.object.isRequired
}


export default IngredientItem