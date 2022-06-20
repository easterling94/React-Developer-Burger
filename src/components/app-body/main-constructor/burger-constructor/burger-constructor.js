import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import ingredientsPropsTypes from '../../../../prop-types'
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
      <Button type='primary' size='medium'>Оформить заказ</Button>
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