import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../../modal/order/order';
import { closeModal } from '../../../store/slices/orderSlice';
import { Modal } from '../../modal';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { sendOrderThunk } from '../../../store/thunks/orderIngredients';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/consts';
import styles from './burger-constructor.module.scss';

export function BurgerConstructorSummary() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user.user);
  const navigate = useNavigate();
  const { 
    orderIngredients, 
    orderIngredientsSuccess,
    orderResponse,
  } = useAppSelector(store => store.order);

  const closeModalState = () => {
    dispatch(closeModal())
  }

  const sendOrderToServer = async () => {
    if(!user) {
      navigate(PATHS.login)
    }
    dispatch(sendOrderThunk())
  }
  const totalCostEval = useMemo(() => {
    return orderIngredients ? orderIngredients.reduce((acc, current) => acc + (current.type === 'bun' ? current.price * 2 : current.price), 0) : 0
  }, [orderIngredients]);

  return(
    <div className={styles.summary}>
      <div className={styles.costs}>
        <span>{totalCostEval}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='medium' onClick={sendOrderToServer} htmlType='button'>Оформить заказ</Button>
      {
        orderIngredientsSuccess ?
        <Modal closeModal={closeModalState}>
          <OrderDetails orderDetails={orderResponse} />
        </Modal>
        : null
      }
    </div>
  )
}