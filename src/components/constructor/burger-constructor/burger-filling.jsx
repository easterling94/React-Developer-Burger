import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useDrop } from 'react-dnd';
import { addIngredientEnhancer, tossingIngredientEnhancer } from '../../../store/enhancers/orderIngredients';
import { OrderedIngredient } from './ordered-ingredient';
import styles from './burger-constructor.module.scss'

export function BurgerFilling() {
  const dispatch = useAppDispatch()
  const orderIngredients = useAppSelector(store => store.order.orderIngredients);

  const filler = orderIngredients.filter(el => el.type !== 'bun');
  const bun = orderIngredients.filter(el => el.type === 'bun')[0];

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(tossingIngredientEnhancer(dragIndex, hoverIndex, filler, bun))
  }, [filler, dispatch]);

  const [{isHover}, dropTarget] = useDrop({
    accept: 'notBun',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(addIngredientEnhancer(ingredient, orderIngredients))
    }
  })

  const filling = orderIngredients ? orderIngredients.filter(el => el.type !== 'bun') : null;
  return (
    <div ref={dropTarget} className={styles.ingredientsFilling}>
      {
        filling && filling.length ?
        filling.map((item, index) => 
          <OrderedIngredient key={item.uuid} index={index} item={item} moveCard={moveCard}/>
        )
        :
        <div className={`${isHover ? styles.fillingEmptyOnHover : styles.fillingEmpty}`}>А сюда передащите остальные ингредиенты</div>
      }
    </div>
  )
}