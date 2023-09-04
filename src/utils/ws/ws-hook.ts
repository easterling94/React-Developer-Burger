import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsStart, wsClose } from '../../store/slices/wsSlice';

export const useSocket = (url: string) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.websocket);

  useEffect(() => {
    dispatch(wsStart(url));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch, url]);

  return data;
};
