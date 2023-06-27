import { ConstructorElement, Button, CurrencyIcon, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import data from '../../utils/data.json'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = () => {
  const totalCostEval = () => {
    return data.reduce((acc, current) => acc + current.price, 0)
  }
  const handleOrder = () => {
    console.log('Заказ оформляется')
  }
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        {
          data.map((item, i) => {
            const position = i === 0 ? 'top' : i === data.length - 1 ? 'bottom' : undefined;
            return (<Item key={item._id} item={item} type={position} i={i}/>)
            }
          )
        }
      </div>
      <div className={styles.summary}>
        <div className={styles.costs}>
          <span>{totalCostEval()}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='medium' onClick={handleOrder} htmlType='button'>Оформить заказ</Button>
      </div>
    </section>
  )
}

function Item({item, type, i}) {
  return (
    <div className={styles.item}>
      {
        item.type !== 'bun' ? 
        <DragIcon type='primary'/>
        : null
      }
      <ConstructorElement 
        text={item.name}
        thumbnail={item.image_mobile}
        price={item.price}
        type={type}
        isLocked={item.type === 'bun' ? true : false}
        handleClose={() => console.log(i)}
      />
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string,
  i: PropTypes.number.isRequired,
}