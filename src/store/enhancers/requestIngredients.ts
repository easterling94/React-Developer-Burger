import { AppDispatch, RootState } from '../store';
import { getDataAPI } from '../../utils/api';
import { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError } from '../slices/ingredientsSlice';
import { handleRequest } from '../../utils/handle-request';

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
  handleRequest(getIngredients, 1000)
}