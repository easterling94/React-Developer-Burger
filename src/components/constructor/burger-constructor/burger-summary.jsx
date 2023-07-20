import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../../modal/order/order';
import { OrderLoader } from '../../modal/order/order-loader';
import { Error } from '../../error/error';
import { closeModal } from '../../../store/slices/orderSlice';
import { Modal } from '../../modal';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { sendOrderEnhancer } from '../../../store/enhancers/orderIngredients';
import { RequestResolver } from '../../request-resolver/request-resolver';
import styles from './burger-constructor.module.scss'

export function BurgerConstructorSummary() {
  const dispatch = useAppDispatch()
  const { 
    orderIngredients, 
    orderIngredientsFetched, 
    orderIngredientsSuccess,
    orderIngredientsFailed,
    orderResponse,
  } = useAppSelector(store => store.order);

  const closeModalState = () => {
    dispatch(closeModal())
  }

  const sendOrderToServer = async () => {
    dispatch(sendOrderEnhancer())
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
      <RequestResolver isLoading={orderIngredientsFetched} isError={orderIngredientsFailed.status} isSuccess={orderIngredientsSuccess}>
        <Modal closeModal={closeModalState}>
          <OrderLoader />
        </Modal>
        <Modal closeModal={closeModalState}>
          <Error response={orderIngredientsFailed.response}/>
        </Modal>
        <Modal closeModal={closeModalState}>
          <OrderDetails orderDetails={orderResponse} />
        </Modal>
      </RequestResolver>
    </div>
  )
}