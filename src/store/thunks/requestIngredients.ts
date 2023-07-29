import { AppDispatch } from '../store';
import { getDataAPI } from '../../utils/api';
import { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientSeparateSuccess } from '../slices/ingredientsSlice';

export const getDataThunk = (id?: string) => (dispatch: AppDispatch) => {
  dispatch(requestIngredientsFetch());
  getDataAPI()
  .then(result => {
    if (id) {
      const item = result.data.filter((el: any) => el._id === id)[0];
      dispatch(requestIngredientSeparateSuccess(item))
      dispatch(requestIngredientsSuccess(result.data))
    } else {
      dispatch(requestIngredientsSuccess(result.data))
    }
  })
}