import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import PropTypes from 'prop-types'
import ingredientsPropsTypes from '../../../prop-types'
import styles from './constructor-body.module.css';

const ConstructorBody = ({ingredients}) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerConstructor ingredients={ingredients}/>
    </main>
  )
}

ConstructorBody.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}

export default ConstructorBody