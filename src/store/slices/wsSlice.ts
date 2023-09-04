import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface wsState {
  data: any | null;
  showWSModal: boolean,
}

const initialState: wsState = {
  data: null,
  showWSModal: false,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    // wsStart и wsClose перечислены в слайсере чтобы не рушить логику RTK - не выводить их в отдельные action файлы
    wsStart: (state, action: PayloadAction<string>) => {},
    wsClose: () => {},
    wsMessage: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    wsHandleModal: (state, action: PayloadAction<boolean>) => {
      state.showWSModal = action.payload;
    }
  },
});

const { actions, reducer, name } = websocketSlice;

export const { wsStart, wsClose, wsMessage, wsHandleModal } = actions;

export const wsName = name;

export default reducer;