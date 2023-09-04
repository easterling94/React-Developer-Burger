import { FeedItem } from './feedItem';
import section from '../section.module.scss';
import { useAppSelector } from '../../../store/store';
import { useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/consts';
import { OrderFeed } from '../../../utils/sharedTypes';
import styles from './index.module.scss';

export const FeedList = () => {
  const data = useAppSelector((store) => store.websocket.data).orders;
  let dataSorted;
  if (data) {
    dataSorted = [...data].sort(
      (a: OrderFeed, b: OrderFeed) => b.number - a.number
    );
  }
  const location = useLocation().pathname;
  const background =
    location === PATHS.feed
      ? 'feed'
      : location === PATHS.profileOrders
      ? 'profile'
      : null;
  return (
    <section className={section.section}>
      <div className={styles.itemsList}>
        {dataSorted
          ? dataSorted.map((el: any, i: number) => {
              return <FeedItem order={el} key={i} background={background} />;
            })
          : null}
      </div>
    </section>
  );
};
