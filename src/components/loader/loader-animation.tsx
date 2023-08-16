import { useState, useEffect } from 'react';
import styles from './loader-animation.module.scss'

export const LoaderAnimation = () => {
  const [dotToMove, setDotToMove] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDotToMove(!dotToMove);
    }, 200);
  }, [dotToMove]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.dotWrapper}>
          <div
            className={`${styles.dot} + ${
              dotToMove ? styles.dot1 : styles.dot1_upp
            }`}
          ></div>
          <div
            className={`${styles.dot} + ${
              dotToMove ? styles.dot2 : styles.dot2_upp
            }`}
          ></div>
          <div
            className={`${styles.dot} + ${
              dotToMove ? styles.dot3 : styles.dot3_upp
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};