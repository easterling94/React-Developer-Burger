import { ConstructorElement, Button, CurrencyIcon, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientsPropsTypes } from '../../../utils/prop-types'
import styles from './burger-constructor.module.scss'

export const Item = ({item, type, i}) => {
  const handleClose = () => {}
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
        handleClose={handleClose}
      />
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape(ingredientsPropsTypes.isRequired).isRequired,
  type: PropTypes.string,
  i: PropTypes.number.isRequired,
}