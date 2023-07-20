import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useDrop } from 'react-dnd';
import { CONSTRUCTOR_ITEM_POSITIONS } from '../../../utils/consts';
import { addIngredientEnhancer } from '../../../store/enhancers/orderIngredients';
import styles from './burger-constructor.module.scss'

export function BurgerBun({type}) {
  const dispatch = useAppDispatch()
  const orderIngredients = useAppSelector(store => store.order.orderIngredients);
  const bun = orderIngredients ? orderIngredients.filter(el => el.type === 'bun')[0] : null
  const [{isHover}, dropTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(addIngredientEnhancer(ingredient))
    }
  })

  return (
    <>
      {bun ?
      <div className={styles.itemBun} ref={dropTarget}>
        <ConstructorElement 
        text={bun.name + `${type === CONSTRUCTOR_ITEM_POSITIONS.top ? ' (верх)' : type === CONSTRUCTOR_ITEM_POSITIONS.bottom ? ' (низ)' : ''}`}
        thumbnail={bun.image_mobile}
        price={bun.price}
        type={type}
        isLocked={bun.type === 'bun' ? true : false}
      />
      </div>
      : 
      <div ref={dropTarget} className={`${isHover ? styles.bunEmptyOnHover : styles.bunEmpty}`}>Перетащите сюда выбранный тип булок</div> 
    }
    </>
  )
}