import { v4 as uuidv4 } from 'uuid';
import { Ingretient, UniqueIdIngredient } from '../../utils/sharedTypes';
import { AppDispatch } from '../store';
import { updateIngredients, orderIngredientsFetched, orderIngredientsSuccess, orderIngredientsFailed } from '../slisers/orderSlice';
import { sendOrderAPI } from '../../utils/api';

export const addIngredientEnhancer = (ingredient: Ingretient, orderIngredients: UniqueIdIngredient[]) => (dispatch: AppDispatch) => {
  if (ingredient.type === 'bun') {
    dispatch(updateIngredients([...orderIngredients.filter(el => el.type !== 'bun'), {...ingredient, uuid: uuidv4()}]))
    return
  }
  dispatch(updateIngredients([...orderIngredients, {...ingredient, uuid: uuidv4()}]))
}

export const deleteIngredientEnhancer = (ingredient: HTMLElement, orderIngredients: UniqueIdIngredient[]) => (dispatch: AppDispatch) => {
  dispatch(updateIngredients(orderIngredients.filter(el => el.uuid !== ingredient.id)))
}

export const tossingIngredientEnhancer = (newOrderIngredients: UniqueIdIngredient[], bun: UniqueIdIngredient) => (dispatch: AppDispatch) => {
  dispatch(updateIngredients([...newOrderIngredients, bun]))
}

export const sendOrderEnhancer = (orderIngredients: UniqueIdIngredient[], orderResponse: number | null) => (dispatch: AppDispatch) => {
  if (orderResponse) {
    dispatch(orderIngredientsSuccess(orderResponse))
    return
  }
  if (orderIngredients.filter(el => el.type === 'bun').length === 0) {
    alert('Пожалуйста, добавьте булки')
    return
  }
  if (orderIngredients.filter(el => el.type !== 'bun').length === 0) {
    alert('Что за бургер без начинки?')
    return
  }
  dispatch(orderIngredientsFetched());
  const sendOrder = async () => {
    const result = await sendOrderAPI(orderIngredients.map(el => el._id));
    if (result.success) {
      dispatch(orderIngredientsSuccess(result.order.number))
    } else {
      dispatch(orderIngredientsFailed(result))
    }
    return
  };

  setTimeout(() => {
    sendOrder();
  }, 2000);
}