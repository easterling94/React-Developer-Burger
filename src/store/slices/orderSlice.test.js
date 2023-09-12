import orderReducer, { updateIngredients, orderIngredientsFetched, orderIngredientsSuccess, orderIngredientsFailed, closeModal } from './orderSlice';

describe('testing order feature', () => {
  const initialState = {
    orderIngredients: [],
    orderResponse: null,
    orderIngredientsFetched: false,
    orderIngredientsSuccess: false,
    orderIngredientsFailed: {
      status: false,
      response: '',
      },
    showModalOrder: false,
  }

  const mockUniqueIngredient = { id: 1, name: 'Флуорисцентная булка', fat: 32 };

  const mockUniqueIngredientsArray = [mockUniqueIngredient, mockUniqueIngredient];

  const mockOrderResponseNumber = 12345;

  const mockServerResponseOnError = 'error';

  it(
    'should update ingredients with unique uuid',
    () => {
      const action = {type: updateIngredients, payload: mockUniqueIngredientsArray};
      const result = orderReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        orderIngredients: action.payload,
        orderResponse: null,
      })
    }
  );

  it(
    'should update flags to fetch',
    () => {
      const action = {type: orderIngredientsFetched};
      const result = orderReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        showModalOrder: true,
        orderIngredientsFetched: true,
      })
    }
  );

  it(
    'should update flags to success',
    () => {
      const action = {type: orderIngredientsSuccess, payload: mockOrderResponseNumber};
      const result = orderReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        showModalOrder: true,
        orderIngredientsFetched: false,
        orderIngredientsSuccess: true,
        orderResponse: action.payload,
      })
    }
  );

  it(
    'should update flags to success',
    () => {
      const action = {type: orderIngredientsFailed, payload: mockServerResponseOnError};
      const result = orderReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        orderIngredientsFetched: false,
        orderIngredientsFailed: {
          status: true,
          response: action.payload,
        },
      })
    }
  );

  it(
    'should update flags to success',
    () => {
      const action = {type: closeModal};
      const result = orderReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        showModalOrder: false,
        orderIngredientsSuccess: false,
        orderIngredientsFailed: {
          status: false,
          response: initialState.orderIngredientsFailed.response,
        }
      })
    }
  )
})