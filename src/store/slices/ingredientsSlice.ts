import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ingredientsTab, Ingretient } from '../../utils/sharedTypes';

export interface IngredientsState {
  ingredients: Array<Ingretient> | null;
  ingredientsTab: ingredientsTab;
  requestIngredientsFetched: boolean;
  requestIngredientsSuccess: boolean;
  requestIngredientsFailed: {
    status: boolean;
    response: string;
  };
}

const initialState: IngredientsState = {
  ingredients: null,
  ingredientsTab: 'bun',
  requestIngredientsFetched: false,
  requestIngredientsSuccess: false,
  requestIngredientsFailed: {
    status: false,
    response: '',
  },
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
    requestIngredientsError: (state, action: PayloadAction<string>) => {
      state.requestIngredientsFetched = false;
      state.requestIngredientsFailed.status = true;
      state.requestIngredientsFailed.response = action.payload;
    },
    switchIngredientsTab: (state, action: PayloadAction<ingredientsTab>) => {
      state.ingredientsTab = action.payload;
    }
  }
})

const { actions, reducer } = ingredientsSlice;

export const { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError, switchIngredientsTab} = actions

export default reducer