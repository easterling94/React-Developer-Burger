import ingredientsReducer, { requestIngredientsFetch, requestIngredientsSuccess, requestIngredientsError, switchIngredientsTab, requestIngredientSeparateSuccess, deleteIngredientSeparate, handleModal } from './ingredientsSlice';

describe('Testing fetching ingredients', () => {

  const initialState = {
    ingredients: null,
    ingredientSeparate: null,
    showModal: false,
    ingredientsTab: 'bun',
    requestIngredientsFetched: false,
    requestIngredientsSuccess: false,
    requestIngredientsFailed: {
      status: false,
      response: '',
    },
  };

  const mockIngredient = { id: 1, name: 'Флуорисцентная булка', fat: 32 }

  const mockIngredients = [
    mockIngredient,
    mockIngredient,
  ];
  
  const mockServerResponseOnError = 'error';

  const mockTab = 'error';

  const mockHandleModal = true;

  it('should update flag to fetching', () => {
      const action = {type: requestIngredientsFetch};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        requestIngredientsFetched: true
      })
    }
  );

  it('should update flag to success', () => {
      const action = {type: requestIngredientsSuccess, payload: mockIngredients};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        requestIngredientsFetched: false,
        ingredients: action.payload,
        requestIngredientsSuccess: true,
      })
    }
  )

  it('should update flag to failed', () => {
      const action = {type: requestIngredientsError, payload: mockServerResponseOnError};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        requestIngredientsFetched: false,
        requestIngredientsFailed: {
          status: true,
          response: action.payload,
        }
      })
    }
  )

  it('should change ingredient tab in nav', () => {
      const action = {type: switchIngredientsTab, payload: mockTab};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        ingredientsTab: action.payload,
      })
    }
  )

  it('should request separate ingredient when reload while modal', () => {
      const action = {type: requestIngredientSeparateSuccess, payload: mockIngredient};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        ingredientSeparate: action.payload,
        requestIngredientsFetched: false,
        requestIngredientsSuccess: true,
      })
    }
  )

  it('should delete separate ingredient when not needed', () => {
      const action = {type: deleteIngredientSeparate};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        ingredientSeparate: null,
      })
    }
  )

  it('should request separate ingredient when reload while modal', () => {
      const action = {type: handleModal, payload: mockHandleModal};
      const result = ingredientsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        showModal: action.payload
      })
    }
  )
})