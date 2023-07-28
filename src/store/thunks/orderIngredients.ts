import { v4 as uuidv4 } from 'uuid';
import { Ingretient } from '../../utils/sharedTypes';
import { AppDispatch, RootState } from '../store';
import { updateIngredients, orderIngredientsFetched, orderIngredientsSuccess, orderIngredientsFailed } from '../slices/orderSlice';
import { sendOrderAPI } from '../../utils/api';
import { handleRequest } from '../../utils/handle-request';

export const addIngredientThunk = (ingredient: Ingretient) => (dispatch: AppDispatch, getState: () => RootState) => {
  const orderIngredients = getState().order.orderIngredients
  if (ingredient.type === 'bun') {
    dispatch(updateIngredients([...orderIngredients.filter(el => el.type !== 'bun'), {...ingredient, uuid: uuidv4()}]));
    return;
  }
  dispatch(updateIngredients([...orderIngredients, {...ingredient, uuid: uuidv4()}]));
}

export const deleteIngredientThunk = (ingredient: HTMLElement) => (dispatch: AppDispatch, getState: () => RootState) => {
  const orderIngredients = getState().order.orderIngredients;
  dispatch(updateIngredients(orderIngredients.filter(el => el.uuid !== ingredient.id)));
}

export const tossingIngredientThunk = (dragIndex: number, hoverIndex: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const filler = getState().order.orderIngredients.filter(el => el.type !== 'bun');
  const bun = getState().order.orderIngredients.filter(el => el.type === 'bun')[0];
  const dragCard = filler[dragIndex];
  const newOrderIngredients = [...filler];
  newOrderIngredients.splice(dragIndex, 1);
  newOrderIngredients.splice(hoverIndex, 0, dragCard);
  dispatch(updateIngredients([...newOrderIngredients, bun]));
}

export const sendOrderThunk = () => (dispatch: AppDispatch, getStore: () => RootState) => {
  const orderResponse = getStore().order.orderResponse;
  const orderIngredients = getStore().order.orderIngredients;
  if (orderResponse) {
    dispatch(orderIngredientsSuccess(orderResponse));
    return;
  }
  if (orderIngredients.filter(el => el.type === 'bun').length === 0) {
    alert('Пожалуйста, добавьте булки');
    return;
  }
  if (orderIngredients.filter(el => el.type !== 'bun').length === 0) {
    alert('Что за бургер без начинки?');
    return;
  }
  dispatch(orderIngredientsFetched());
  const sendOrder = async () => {
    const result = await sendOrderAPI(orderIngredients.map(el => el._id));
    if (result.success) {
      dispatch(orderIngredientsSuccess(result.order.number));
    } else {
      dispatch(orderIngredientsFailed(result));
    }
    return;
  };
  handleRequest(sendOrder, 0);
}