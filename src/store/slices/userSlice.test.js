import userReducer, {updateUser, logoutUser, passwordReset, checkUser} from './userSlice';

describe('testing user fetching', () => {
  const initialState = {
    user: null,
    userAuthorized: false,
    passwordReset: false,
    userChecked: false,
  };

  const mockUserMainCredentials = {
    name: 'name',
    email: 'email',
  };

  const mockCheckUser = true;

  it(
    'should update user',
    () => {
      const action = {type: updateUser, payload: mockUserMainCredentials};
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: action.payload,
        userAuthorized: true,
      })
    }
  );

  it(
    'should logout user',
    () => {
      const action = {type: logoutUser};
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: null,
        userAuthorized: !initialState.userAuthorized,
      })
    }
  );

  it(
    'should send reset password',
    () => {
      const action = {type: passwordReset};
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        passwordReset: !initialState.passwordReset,
      })
    }
  );

  it(
    'should check if user exists/get user by accessTocken',
    () => {
      const action = {type: checkUser, payload: mockCheckUser};
      const result = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        userChecked: action.payload,
      })
    }
  );
})