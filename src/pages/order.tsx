import { OrderHistory } from '../components/modal/order-history/order-history';
import { WS_ALL, BASE_WS } from '../utils/api';
import { useSocket } from '../utils/ws/ws-hook';
import { getCookie } from '../utils/cookie';

export const OrderPage = ({ type }: { type: 'feed' | 'profile' }) => {
  const accessToken = getCookie('accessToken');
  const link = type === 'feed' ? WS_ALL : BASE_WS + `?token=${accessToken}`;
  const data = useSocket(link);
  return data ? (
    <div>
      <OrderHistory />
    </div>
  ) : null;
};
