import styles from './index.module.scss';
import { FeedList } from './feed-list';
import { FeedStat } from './feed-stat';

const FeedIndex = () => {
  return (
    <>
      <h1 className={styles.h1}>Лента заказов</h1>
      <div className={styles.wrapper}>
        <FeedList />
        <FeedStat />
      </div>
    </>
  );
};

export default FeedIndex;
