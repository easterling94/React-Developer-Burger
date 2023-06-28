import { BurgerIngredients } from './burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './burger-constructor/burger-constructor'
import PropTypes from 'prop-types'
import { ingredientsPropsTypes } from '../../utils/prop-types'
import styles from './index.module.scss'

export const ConstructorIndex = ({ingredients}) => {
  return (
    <>
      <h1 className={styles.h1}>Соберите бургер</h1>
      <div className={styles.wrapper}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </div>
    </>
  )
}

ConstructorIndex.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}