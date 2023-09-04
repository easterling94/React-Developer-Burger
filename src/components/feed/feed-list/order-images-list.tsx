import { OrderImages } from '../../../utils/sharedTypes';
import styles from './index.module.scss';

export const OrderImagesList = ({
  images,
}: {
  images: ReadonlyArray<OrderImages>;
}) => (
  <div className={styles.images}>
    {images.map((el: any, i: number) => {
      if (i < 4) {
        return (
          <div className={styles.imageBorder} key={i}>
            <img src={el.source} className={styles.image} alt={el.alt} />
          </div>
        );
      } else if (i === 4) {
        return (
          <div className={styles.imageBorder} key={i}>
            <img src={el.source} className={styles.image} alt={el.alt} />
            {images.length - i - 1 > 0 ? (
              <p className={styles.rest} key={i}>
                +{images.length - i - 1}
              </p>
            ) : null}
          </div>
        );
      }
      return null;
    })}
  </div>
);
