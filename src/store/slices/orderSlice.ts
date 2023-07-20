import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { UniqueIdIngredient } from '../../utils/sharedTypes';

export interface OrderState {
  orderIngredients: Array<UniqueIdIngredient> | [];
  orderResponse: number | null;
  orderIngredientsFetched: boolean;
  orderIngredientsSuccess: boolean;
  orderIngredientsFailed: {
    status: boolean,
    response: string,
  };
}

const initialState: OrderState = {
  orderIngredients: [],
  orderResponse: null,
  orderIngredientsFetched: false,
  orderIngredientsSuccess: false,
  orderIngredientsFailed: {
  status: false,
  response: '',
  },
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
    orderIngredientsFailed: (state, action: PayloadAction<string>) => {
      state.orderIngredientsFetched = false;
      state.orderIngredientsFailed.status = true;
      state.orderIngredientsFailed.response = action.payload;
    },
    closeModal: (state) => {
      state.orderIngredientsSuccess = false;
      state.orderIngredientsFailed.status = false;
    }
  }
})

const { actions, reducer } = orderSlice;

export const { updateIngredients, orderIngredientsFetched, orderIngredientsSuccess, orderIngredientsFailed, closeModal } = actions;

export default reducer;