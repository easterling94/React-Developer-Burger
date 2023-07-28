import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { inputName } from '../../utils/form';

interface Form {
  name: string;
  email: string;
  password: string;
  code: string;
}

const initialState: Form = {
  name: '',
  email: '',
  password: '',
  code: '',
};
 
interface Input {
  name: inputName,
  value: string,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Input>) => {
      state[action.payload.name] = action.payload.value
    }
  }
})

const { actions, reducer } = formSlice;

export const { updateForm } = actions;

export default reducer;