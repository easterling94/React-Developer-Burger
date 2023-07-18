import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { useDrop, useDrag } from 'react-dnd'
import { deleteIngredientEnhancer } from '../../../store/enhancers/orderIngredients'
import styles from './burger-constructor.module.scss'

export function OrderedIngredient({item, index, moveCard}) {
  const orderIngredients = useAppSelector(store => store.order.orderIngredients);
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  const handleClose = () => {
    dispatch(deleteIngredientEnhancer(ref.current, orderIngredients))
  }

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      className={styles.item}
      data-handler-id={handlerId}
      id={item.uuid}
    >
      <DragIcon type='primary'/>
      <ConstructorElement text={item.name} thumbnail={item.image_mobile} price={item.price} handleClose={handleClose}/>
    </div>
  )
}