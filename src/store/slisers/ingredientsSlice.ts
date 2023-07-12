import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ingredientsTab = 'bun' | 'main' | 'sauce'

export interface Ingretient {
  _id: string,
  name: string,
  type: ingredientsTab,
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
  ingredientsTab: ingredientsTab,
  requestIngredientsFetched: boolean;
  requestIngredientsSuccess: boolean;
  requestIngredientsFailed: boolean;

}

const initialState: IngredientsState = {
  ingredients: null,
  ingredientsTab: 'bun',
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
    switchIngredientsTab: (state, action: PayloadAction<ingredientsTab>) => {
      state.ingredientsTab = action.payload;
    }
  }
})

const { actions, reducer } = ingredientsSlice;

export const { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError, switchIngredientsTab} = actions

export default reducer