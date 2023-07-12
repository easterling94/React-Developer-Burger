import { AppDispatch } from '../store'
import { requestIngredientsFetch } from '../slisers/ingredientsSlice'

const loggerEnhancer = () => (dispatch: AppDispatch) => {
  if(true) {
    dispatch(requestIngredientsFetch())
  }
}

export default loggerEnhancer