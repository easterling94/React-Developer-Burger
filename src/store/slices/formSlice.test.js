import formReducer, { updateForm } from './formSlice';

describe('Input form slicer test', () => {

  const initialState = {
    name: '',
    email: '',
    password: '',
    code: '',
  };

  it('should update name input', () => {
    const action = {type: updateForm, payload: {name: 'name', value: 'name'}};
    const result = formReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      name: action.payload.value
    })
  });

  it('should update email input', () => {
    const action = {type: updateForm, payload: {name: 'email', value: 'email'}};
    const result = formReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      email: action.payload.value
    })
  });

  it('should update password input', () => {
    const action = {type: updateForm, payload: {name: 'password', value: 'password'}};
    const result = formReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      password: action.payload.value
    })
  });

  it('should update code input', () => {
    const action = {type: updateForm, payload: {name: 'code', value: 'code'}};
    const result = formReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      code: action.payload.value
    })
  });
})