import { BurgerIngredients } from './burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './burger-constructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './index.module.scss'

export const ConstructorIndex = () => (
  <>
    <h1 className={styles.h1}>Соберите бургер</h1>
    <div className={styles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  </>
)