import FeedIndex from '../components/feed';
import { useSocket } from '../utils/ws/ws-hook';
import { WS_ALL } from '../utils/api';

export const FeedPage = () => {
  const data = useSocket(WS_ALL);
  return data ? <FeedIndex /> : null;
};
