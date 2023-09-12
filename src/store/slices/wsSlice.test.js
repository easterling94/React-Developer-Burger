import wsReducer, {wsStart, wsClose, wsMessage, wsHandleModal} from './wsSlice';

describe('testing websocket feature', () => {
  const initialState = {
    data: null,
    showWSModal: false,
  };

  const mockWSURL = '';
  
  const mockWSMessage = '';

  const mockHandleModal = true;

  it(
    'should start ws connection',
    () => {
      const action = {type: wsStart, payload: mockWSURL};
      const result = wsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
      })
    }
  );

  it(
    'should close ws connection',
    () => {
      const action = {type: wsClose};
      const result = wsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
      })
    }
  );

  it(
    'should update when message arrive',
    () => {
      const action = {type: wsMessage, payload: mockWSMessage};
      const result = wsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        data: action.payload,
      })
    }
  );

  it(
    'should update ws modal info',
    () => {
      const action = {type: wsHandleModal, payload: mockHandleModal};
      const result = wsReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        showWSModal: action.payload,
      })
    }
  );
})