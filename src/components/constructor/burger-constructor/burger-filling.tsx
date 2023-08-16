import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useDrop } from 'react-dnd';
import { addIngredientThunk } from '../../../store/thunks/orderIngredients';
import { OrderedIngredient } from './ordered-ingredient';
import styles from './burger-constructor.module.scss';

export function BurgerFilling() {
  const dispatch = useAppDispatch();
  const orderIngredients = useAppSelector(
    (store) => store.order.orderIngredients
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'notBun',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: any) {
      dispatch(addIngredientThunk(ingredient));
    },
  });

  const filling = orderIngredients
    ? orderIngredients.filter((el) => el.type !== 'bun')
    : null;
  return (
    <div ref={dropTarget} className={styles.ingredientsFilling}>
      {filling && filling.length ? (
        filling.map((item, index) => (
          <OrderedIngredient key={item.uuid} index={index} item={item} />
        ))
      ) : (
        <div
          className={`${
            isHover ? styles.fillingEmptyOnHover : styles.fillingEmpty
          }`}
        >
          А сюда передащите остальные ингредиенты
        </div>
      )}
    </div>
  );
}
