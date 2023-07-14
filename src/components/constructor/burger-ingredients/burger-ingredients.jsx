import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { INGREDIENTS_TYPES } from '../../../utils/consts'
import { ItemsList } from './items-list'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { switchIngredientsTabEnhancer, scrollToView } from '../../../store/enhancers/switchIngredientsTab'
import styles from './burger-ingredients.module.scss'

export const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const { ingredientsTab, ingredients } = useAppSelector(store => store.ingredients);

  const changeView = () => {
    dispatch(switchIngredientsTabEnhancer(ingredientsTab))
  }

  const BUNS = useMemo(() => ingredients.filter(el => el.type === INGREDIENTS_TYPES[0].type), [ingredients]);
  const MAIN = useMemo(() => ingredients.filter(el => el.type === INGREDIENTS_TYPES[1].type), [ingredients]);
  const SAUCE = useMemo(() => ingredients.filter(el => el.type === INGREDIENTS_TYPES[2].type), [ingredients]);

  return (
    <section className={styles.section} >
      <nav className={styles.nav} id='nav'>
        <Tab value={INGREDIENTS_TYPES[0].type} active={ingredientsTab === INGREDIENTS_TYPES[0].type} onClick={() => scrollToView(INGREDIENTS_TYPES[0].type)}>
        {INGREDIENTS_TYPES[0].name}
        </Tab>
        <Tab value={INGREDIENTS_TYPES[1].type} active={ingredientsTab === INGREDIENTS_TYPES[1].type} onClick={() => scrollToView(INGREDIENTS_TYPES[1].type)}>
        {INGREDIENTS_TYPES[1].name}
        </Tab>
        <Tab value={INGREDIENTS_TYPES[2].type} active={ingredientsTab === INGREDIENTS_TYPES[2].type} onClick={() => scrollToView(INGREDIENTS_TYPES[2].type)}>
        {INGREDIENTS_TYPES[2].name}
        </Tab>
      </nav>
      <div className={styles.itemsList} onScroll={changeView}>
        <ItemsList id='bun' name={INGREDIENTS_TYPES[0].name} ingredients={BUNS}/>
        <ItemsList id='main' name={INGREDIENTS_TYPES[1].name} ingredients={MAIN}/>
        <ItemsList id='sauce' name={INGREDIENTS_TYPES[2].name} ingredients={SAUCE}/>
      </div>
    </section>
  )
}