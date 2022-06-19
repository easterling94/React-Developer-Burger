import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Item from './item'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import ingredientsPropsTypes from '../../../../prop-types'

const IngredientsNavigation = () => {
  const [ingredientToShow, setIngredientToShow] = useState('buns');
  const setCurrentIngredient = (e) => {
    setIngredientToShow(e);
    const scrollTo = document.getElementById(e);
    scrollTo.scrollIntoView({behavior: 'smooth'});

  }
  return (
    <nav className={styles.navigation}>
      <Tab value="buns" active={ingredientToShow === 'buns'} onClick={(e) => setCurrentIngredient(e)}>
        Булки
      </Tab>
      <Tab value="sauses" active={ingredientToShow === 'sauses'} onClick={(e) => setCurrentIngredient(e)}>
        Соусы
      </Tab>
      <Tab value="mains" active={ingredientToShow === 'mains'} onClick={(e) => setCurrentIngredient(e)}>
        Начинки
      </Tab>
    </nav>
  )
}

const IngredientsType = ({ingredientId, header, ingredients}) => {
  return (
    <>
      <h3 id={ingredientId} className={styles.headerIngredient}>{header}</h3>
      <div className={styles.ingredient}>
        {
          ingredients.map((el) => 
          <Item key={el._id} item={el}/>)
        }
      </div>
    </>
  )
}

const BurgerIngredients = ({ingredients}) => {

  const ingredientsList = (n) => {
    const arr = ingredients.filter((el) => el.type === n);
    return(arr);
  }
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.headerSection}>Соберите бургер</h1>
      <IngredientsNavigation />
      <div className={styles.ingredients}>
        <IngredientsType ingredientId={'buns'} header='Булки' ingredients={ingredientsList('bun')}/>
        <IngredientsType ingredientId={'sauses'} header='Соусы' ingredients={ingredientsList('sauce')}/>
        <IngredientsType ingredientId={'mains'} header='Начинки' ingredients={ingredientsList('main')}/>
      </div>
    </section>
  )
}

IngredientsType.propTypes = {
  ingredientId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired,
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}

export default BurgerIngredients