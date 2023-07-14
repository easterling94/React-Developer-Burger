import { Button, CurrencyIcon, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from '../../modal/order/order'
import { OrderLoader } from '../../modal/order/order-loader'
import { useMemo, useCallback, useRef } from 'react'
import { Modal } from '../../modal'
import { CONSTRUCTOR_ITEM_POSITIONS } from '../../../utils/consts'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { useDrop, useDrag } from 'react-dnd'
import { addIngredientEnhancer, deleteIngredientEnhancer, tossingIngredientEnhancer, sendOrderEnhancer } from '../../../store/enhancers/orderIngredients'
import styles from './burger-constructor.module.scss'
import { closeModal } from '../../../store/slisers/orderSlice'

export const BurgerConstructor = () => {
  return (
    <section className={styles.section}>
      <div>
        <BurgerBun type={CONSTRUCTOR_ITEM_POSITIONS.top}/>
        <BurgerFillin />
        <BurgerBun type={CONSTRUCTOR_ITEM_POSITIONS.bottom}/>
      </div>
      <BurgerConstructorSummary />
    </section>
  )
}

function BurgerBun({type}) {
  const dispatch = useAppDispatch()
  const { orderIngredients } = useAppSelector(store => store.order);
  const bun = orderIngredients ? orderIngredients.filter(el => el.type === 'bun')[0] : null
  const [{isHover}, dropTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(addIngredientEnhancer(ingredient, orderIngredients))
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

function BurgerFillin() {
  const dispatch = useAppDispatch()
  const { orderIngredients } = useAppSelector(store => store.order);

  const filler = orderIngredients.filter(el => el.type !== 'bun')
  const bun = orderIngredients.filter(el => el.type === 'bun')[0]

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = filler[dragIndex];
    const newOrderIngredients = [...filler]
    newOrderIngredients.splice(dragIndex, 1)
    newOrderIngredients.splice(hoverIndex, 0, dragCard)
    dispatch(tossingIngredientEnhancer(newOrderIngredients, bun))
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

function OrderedIngredient({item, index, moveCard}) {
  const { orderIngredients } = useAppSelector(store => store.order);
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

function BurgerConstructorSummary() {
  const dispatch = useAppDispatch()
  const { 
    orderIngredients, 
    orderIngredientsFetched, 
    orderIngredientsSuccess,
    orderResponse,
  } = useAppSelector(store => store.order);

  const closeModalState = () => {
    dispatch(closeModal())
  }

  const sendOrderToServer = async () => {
    dispatch(sendOrderEnhancer(orderIngredients, orderResponse))
  }
  const totalCostEval = useMemo(() => {
    return orderIngredients ? orderIngredients.reduce((acc, current) => acc + (current.type === 'bun' ? current.price * 2 : current.price), 0) : 0
  }, [orderIngredients])

  return(
    <div className={styles.summary}>
      <div className={styles.costs}>
        <span>{totalCostEval}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='medium' onClick={sendOrderToServer} htmlType='button'>Оформить заказ</Button>
      {
        orderIngredientsFetched? 
        <Modal closeModal={closeModalState}>
          <OrderLoader />
        </Modal>
        : 
        orderIngredientsSuccess ? 
        <Modal closeModal={closeModalState}>
          <OrderDetails orderDetails={orderResponse} />
        </Modal>
        : null
      }
  </div>
  )
}