import { AppDispatch } from '../store';
import { getDataAPI } from '../../utils/api';
import { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError } from '../slisers/ingredientsSlice';

export const getDataEnhancer = () => (dispatch: AppDispatch) => {
  dispatch(requestIngredientsFetch());
  const getIngredients = async () => {
    const result = await getDataAPI();
    if (result.success) {
      dispatch(requestIngredientsSuccess(result.data))
    } else {
      dispatch(requestIngredientsError(result))
    }
    return
  };

  setTimeout(() => {
    getIngredients();
  }, 2000);
}