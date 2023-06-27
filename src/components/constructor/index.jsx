import styles from './index.module.scss'
import { BurgerIngredients } from './burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './burger-constructor/burger-constructor'
export const ConstructorIndex = () => {
  return (
    <>
      <h1 className={styles.h1}>Соберите бургер</h1>
      <div className={styles.wrapper}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  )
}