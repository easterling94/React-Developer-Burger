import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { UniqueIdIngredient } from '../../utils/sharedTypes';

export interface OrderState {
  orderIngredients: Array<UniqueIdIngredient> | [];
  orderIngredientsFetched: boolean;
  orderIngredientsSuccess: boolean;
  orderIngredientsFailed: boolean;
  orderResponse: number | null;
}

const initialState: OrderState = {
  orderIngredients: [],
  orderIngredientsFetched: false,
  orderIngredientsSuccess: false,
  orderIngredientsFailed: false,
  orderResponse: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateIngredients: (state, action: PayloadAction<UniqueIdIngredient[]>) => {
      state.orderIngredients = action.payload;
      state.orderResponse = null;
    },
    orderIngredientsFetched: (state) => {
      state.orderIngredientsFetched = true;
    },
    orderIngredientsSuccess: (state, action: PayloadAction<number>) => {
      state.orderIngredientsFetched = false;
      state.orderIngredientsSuccess = true;
      state.orderResponse = action.payload;
    },
    orderIngredientsFailed: (state) => {
      state.orderIngredientsFetched = false;
      state.orderIngredientsFailed = true;
    },
    closeModal: (state) => {
      state.orderIngredientsSuccess = false;
      state.orderIngredientsFailed = false;
    }
  }
})

const { actions, reducer } = orderSlice;

export const { updateIngredients, orderIngredientsFetched, orderIngredientsSuccess, orderIngredientsFailed, closeModal } = actions;

export default reducer;