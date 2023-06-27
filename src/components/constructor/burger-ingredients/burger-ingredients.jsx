import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { INGREDIENTS_TYPES } from '../../utils/consts'
import { ItemsList } from './items-list'

import { useState, useMemo } from 'react'
import data from '../../utils/data.json'
import styles from './burger-ingredients.module.scss'

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState(INGREDIENTS_TYPES[0].type);

  const BUNS = useMemo(() => data.filter(el => el.type === INGREDIENTS_TYPES[0].type), [data]);
  const MAIN = useMemo(() => data.filter(el => el.type === INGREDIENTS_TYPES[1].type), [data]);
  const SAUCE = useMemo(() => data.filter(el => el.type === INGREDIENTS_TYPES[2].type), [data]);

  return (
    <section className={styles.section} >
      <nav className={styles.nav}>
        <Tab value={INGREDIENTS_TYPES[0].type} active={current === INGREDIENTS_TYPES[0].type} onClick={() => setCurrent(INGREDIENTS_TYPES[0].type)}>
        {INGREDIENTS_TYPES[0].name}
        </Tab>
        <Tab value={INGREDIENTS_TYPES[1].type} active={current === INGREDIENTS_TYPES[1].type} onClick={() => setCurrent(INGREDIENTS_TYPES[1].type)}>
        {INGREDIENTS_TYPES[1].name}
        </Tab>
        <Tab value={INGREDIENTS_TYPES[2].type} active={current === INGREDIENTS_TYPES[2].type} onClick={() => setCurrent(INGREDIENTS_TYPES[2].type)}>
        {INGREDIENTS_TYPES[2].name}
        </Tab>
      </nav>
      <div className={styles.itemsList}>
        <ItemsList name={INGREDIENTS_TYPES[0].name} ingredients={BUNS}/>
        <ItemsList name={INGREDIENTS_TYPES[1].name} ingredients={MAIN}/>
        <ItemsList name={INGREDIENTS_TYPES[2].name} ingredients={SAUCE}/>
      </div>
    </section>
  )
}