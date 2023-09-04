import { ProfileOrders } from '../components/profile/profile-orders';
import { BASE_WS } from '../utils/api';
import { useSocket } from '../utils/ws/ws-hook';
import { getCookie } from '../utils/cookie';

export const ProfileOrdersPage = () => {
  const accessToken = getCookie('accessToken');
  const data = useSocket(BASE_WS + `?token=${accessToken}`);
  return data ? <ProfileOrders /> : null;
};
