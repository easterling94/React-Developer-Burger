import { BurgerBun } from './burger-bun';
import { BurgerFilling } from './burger-filling';
import { BurgerConstructorSummary } from './burger-summary';
import { CONSTRUCTOR_ITEM_POSITIONS } from '../../../utils/consts'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = () => {
  return (
    <section className={styles.section}>
      <div className={styles.orderIngredientsContainer}>
        <BurgerBun type={CONSTRUCTOR_ITEM_POSITIONS.top}/>
        <BurgerFilling />
        <BurgerBun type={CONSTRUCTOR_ITEM_POSITIONS.bottom}/>
      </div>
      <BurgerConstructorSummary />
    </section>
  )
}