import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useDrop } from 'react-dnd';
import { CONSTRUCTOR_ITEM_POSITIONS } from '../../../utils/consts';
import { addIngredientThunk } from '../../../store/thunks/orderIngredients';
import styles from './burger-constructor.module.scss';

type TBurgerBun = {
  type: CONSTRUCTOR_ITEM_POSITIONS;
};

export function BurgerBun({ type }: TBurgerBun) {
  const dispatch = useAppDispatch();
  const orderIngredients = useAppSelector(
    (store) => store.order.orderIngredients
  );
  const bun = orderIngredients
    ? orderIngredients.filter((el) => el.type === 'bun')[0]
    : null;

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: any) {
      dispatch(addIngredientThunk(ingredient));
    },
  });

  return (
    <>
      {bun ? (
        <div
          className={styles.itemBun}
          ref={dropTarget}
          data-cy='drop-area-bun'
        >
          <ConstructorElement
            text={
              bun.name +
              `${
                type === CONSTRUCTOR_ITEM_POSITIONS.top
                  ? ' (верх)'
                  : type === CONSTRUCTOR_ITEM_POSITIONS.bottom
                  ? ' (низ)'
                  : ''
              }`
            }
            thumbnail={bun.image_mobile}
            price={bun.price}
            type={type === 'bottom' ? 'bottom' : 'top'}
            isLocked={bun.type === 'bun' ? true : false}
          />
        </div>
      ) : (
        <div
          ref={dropTarget}
          data-cy='drop-area-bun'
          className={`${isHover ? styles.bunEmptyOnHover : styles.bunEmpty}`}
        >
          Перетащите сюда выбранный тип булок
        </div>
      )}
    </>
  );
}
