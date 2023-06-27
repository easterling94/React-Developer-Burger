import { Tab, Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientsPropsTypes } from '../../utils/prop-types'
import { useState } from 'react'
import data from '../../utils/data.json'
import styles from './burger-ingredients.module.scss'

export const BurgerIngredients = () => {
  const INGREDIENTS_TYPES = [
    {
      type: 'bun',
      name: 'Булки'
    },
    {
      type: 'main',
      name: 'Начинки'
    },
    {
      type: 'sauce',
      name: 'Соусы'
    }
  ]

  const [current, setCurrent] = useState(INGREDIENTS_TYPES[0].type);

  const BUNS = data.filter(el => el.type === INGREDIENTS_TYPES[0].type);
  const MAIN = data.filter(el => el.type === INGREDIENTS_TYPES[1].type);
  const SAUCE = data.filter(el => el.type === INGREDIENTS_TYPES[2].type);

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

function ItemsList({name, ingredients}) {
  return (
    <div className={styles.list}>
      <h2 className={styles.h2}>{name}</h2>
      <div className={styles.wrapper}>
        {
          ingredients.map(item => {
            return (
              <Item key={item._id} item={item}/>
            )
          })
        }
      </div>
    </div>
  )
}

function Item ({item}) {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div className={styles.item} onClick={handleClick}>
      <Counter className={styles.counter} count={count} size={count < 10 ? 'default' : 'small'}/>
      <img alt={item.name} src={item.image} className={styles.img}/>
      <p className={styles.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary'/>
      </p>
      <p className={styles.name}>
        {item.name}
      </p>
    </div>
  )
}

ItemsList.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired,
}

Item.propTypes = {
  item: PropTypes.shape(ingredientsPropsTypes.isRequired).isRequired,
}