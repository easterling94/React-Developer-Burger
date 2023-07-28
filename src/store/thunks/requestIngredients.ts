import { AppDispatch } from '../store';
import { getDataAPI } from '../../utils/api';
import { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError, requestIngredientSeparateSuccess } from '../slices/ingredientsSlice';
import { handleRequest } from '../../utils/handle-request';

export const getDataThunk = (id?: string) => (dispatch: AppDispatch) => {
  dispatch(requestIngredientsFetch());
  const getIngredients = async () => {
    const result = await getDataAPI();
    if (result.success) {
      if (id) {
        const item = result.data.filter((el: any) => el._id === id)[0];
        dispatch(requestIngredientSeparateSuccess(item))
        dispatch(requestIngredientsSuccess(result.data))
      } else {
        dispatch(requestIngredientsSuccess(result.data))
      }
    } else {
      dispatch(requestIngredientsError(result))
    }
    return
  };
  handleRequest(getIngredients, 0)
}