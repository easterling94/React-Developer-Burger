import { useState, useEffect } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { Link, useLocation } from 'react-router-dom';
import { handleModal } from '../../../store/slices/ingredientsSlice';
import { getDataThunk } from '../../../store/thunks/requestIngredients';
import { Ingretient } from '../../../utils/sharedTypes';
import styles from './burger-ingredients.module.scss';

type TItem = {
  item: Ingretient;
};

export const Item = ({ item }: TItem) => {
  const orderIngredients = useAppSelector(
    (store) => store.order.orderIngredients
  );
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const location = useLocation();
  const ingredientId = item['_id'];
  const ingredientType = item['type'];

  useEffect(() => {
    setCount(
      orderIngredients.length
        ? orderIngredients.filter((el) => el._id === item._id).length
        : 0
    );
  }, [orderIngredients]);

  const [{ opacity }, dragRef] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'notBun',
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  const handleClick = () => {
    dispatch(getDataThunk(ingredientId));
    dispatch(handleModal(true));
  };

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ ingredientPage: location }}
      className={styles.link}
      data-cy={`ingredient-${ingredientType !== 'bun' ? 'filling' : 'bun'}`}
    >
      <div className={styles.item} ref={dragRef} style={{ opacity }}>
        <Counter
          extraClass={styles.counter}
          count={count}
          size={count < 10 ? 'default' : 'small'}
        />
        <img
          alt={item.name}
          src={item.image}
          className={styles.img}
          onClick={handleClick}
        />
        <p className={styles.price}>
          <span>{item.price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={styles.name}>{item.name}</p>
      </div>
    </Link>
  );
};
