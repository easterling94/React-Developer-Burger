import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Ingretient {
  _id: string,
  name: string,
  type: 'bun' | 'main' | 'sauce',
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export interface IngredientsState {
  ingredients: Array<Ingretient> | null;
  requestIngredientsFetched: boolean;
  requestIngredientsSuccess: boolean;
  requestIngredientsFailed: boolean;

}

const initialState: IngredientsState = {
  ingredients: null,
  requestIngredientsFetched: false,
  requestIngredientsSuccess: false,
  requestIngredientsFailed: false,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    requestIngredientsFetch: (state) => {
      state.requestIngredientsFetched = true
    },
    requestIngredientsSuccess: (state, action: PayloadAction<Array<Ingretient>>) => {
      state.ingredients = action.payload;
      state.requestIngredientsFetched = false;
      state.requestIngredientsSuccess = true;
    },
    requestIngredientsError: (state) => {
      state.requestIngredientsFailed = true;
    },
  }
})

const { actions, reducer } = ingredientsSlice;

export const { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError} = actions

export default reducer