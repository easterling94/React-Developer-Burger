import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../../modal/order/order';
import { closeModal } from '../../../store/slices/orderSlice';
import { Modal } from '../../modal';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { sendOrderThunk } from '../../../store/thunks/orderIngredients';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/consts';
import { RequestResolver } from '../../request-resolver/request-resolver';
import { OrderLoader } from '../../modal/order/order-loader';
import { Error } from '../../error/error';
import { UniqueIdIngredient } from '../../../utils/sharedTypes';
import styles from './burger-constructor.module.scss';

export function BurgerConstructorSummary() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const {
    orderIngredients,
    orderIngredientsFetched,
    orderIngredientsSuccess,
    orderIngredientsFailed,
    orderResponse,
  } = useAppSelector((store) => store.order);

  const closeModalState = () => {
    dispatch(closeModal());
  };

  const sendOrderToServer = async () => {
    if (!user) {
      navigate(PATHS.LOGIN);
    }
    dispatch(sendOrderThunk());
  };
  const totalCostEval = useMemo(() => {
    return orderIngredients
      ? (orderIngredients as UniqueIdIngredient[]).reduce(
          (acc: number, current: UniqueIdIngredient) =>
            acc + (current.type === 'bun' ? current.price * 2 : current.price),
          0
        )
      : 0;
  }, [orderIngredients]);

  return (
    <div className={styles.summary}>
      <div className={styles.costs}>
        <span>{totalCostEval}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        type='primary'
        size='medium'
        onClick={sendOrderToServer}
        htmlType='button'
        data-cy='submit-order'
      >
        Оформить заказ
      </Button>
      <RequestResolver
        isLoading={orderIngredientsFetched}
        isError={orderIngredientsFailed.status}
        isSuccess={orderIngredientsSuccess}
      >
        <Modal closeModal={closeModalState}>
          <OrderLoader />
        </Modal>
        <Modal closeModal={closeModalState}>
          <Error response={orderIngredientsFailed.response} />
        </Modal>
        <Modal closeModal={closeModalState}>
          <OrderDetails orderDetails={orderResponse} />
        </Modal>
      </RequestResolver>
    </div>
  );
}
