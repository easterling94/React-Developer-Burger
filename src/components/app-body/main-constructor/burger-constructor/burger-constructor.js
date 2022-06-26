import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientsPropsTypes from '../../../../prop-types'
import OrderDetails from '../../../order-details/order-details'
import Modal from '../../../modal/modal';
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'

const BurgerConstructorList = ({ingredients}) => {
  const ingredientsBunsFiltered = ingredients.filter((el) => el.type !== 'bun');
  return (
    <section className={styles.section}>
      <div className={styles.ingredientsBunUpper}>
        <ConstructorElement type='top' isLocked={true} text='Краторная булка N-200i (верх)' thumbnail={ingredients[0].image_mobile} price={ingredients[0].price}/>
      </div>
      <div className={styles.ingredientsNotBuns}>
        {
          ingredientsBunsFiltered.map((el) => 
          <div className={styles.ingredient} key={el._id}>
            <DragIcon type='primary'/>
            <ConstructorElement text={el.name} thumbnail={el.image_mobile} price={el.price}/>
          </div>
          )
        }
      </div>
      <div className={styles.ingredientsBunBottom}>
        <ConstructorElement type='bottom' isLocked={true} text='Краторная булка N-200i (низ)' thumbnail={ingredients[0].image_mobile} price={ingredients[0].price}/>
      </div>
    </section>
  )
}

const BurgerConstructorSummary = ({ingredients}) => {

  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  }

  const closeModal = (e) => {
    if (e === 'Escape' || e.target.id === 'modalOverlay' || e.target.parentElement.id === 'modalCloseBtn' || e.target.parentElement.parentElement.id === 'modalCloseBtn') setIsModalOpened(false);
    return;
  }

  const modalDetails = {
    id: '034536',
    status: true,
    message: 'Ваш заказ начали готовить'
  }

  const ingredientsBunsFiltered = ingredients.filter((el) => el.type !== 'bun');
  const totalCostEval = () => {
    let total = 0;
    ingredientsBunsFiltered.forEach((el) => total += el.price);
    total += (ingredients[0].price * 2);
    return <span>{total}</span>;
  }
  return (
    <div className={styles.summary}>
      <div className={styles.costs}>
        {totalCostEval()}
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='medium' onClick={openModal}>Оформить заказ</Button>
      {isModalOpened && (
      <Modal closeModal={closeModal}>
        <OrderDetails data={modalDetails}/>
      </Modal>
      )}
    </div>
  )
}


const BurgerConstructor = ({ ingredients }) => {
  return (
    <section>
      <BurgerConstructorList ingredients={ingredients} />
      <BurgerConstructorSummary ingredients={ingredients} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}

export default BurgerConstructor