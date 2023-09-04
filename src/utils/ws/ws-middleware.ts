import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../store/store';
import { WS_TYPES } from '../consts';
import { wsMessage } from '../../store/slices/wsSlice';

export const websocketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => action => {

      const { type } = action;
      const { dispatch } = store;

      switch (type) {
        case WS_TYPES.WS_START:
          socket = new WebSocket(action.payload);
          socket.onmessage = (message: MessageEvent) => {
            dispatch(wsMessage(JSON.parse(message.data)));
          };
          break;
        case WS_TYPES.WS_CLOSE:
          if (socket !== null) {
            socket.close();
          }
          socket = null;
          break;
        default:
          return next(action);
      }
    };
  }) as Middleware;
};