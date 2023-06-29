import { useState, useEffect } from 'react';
import styles from './jumping-dots.module.scss'

export const JumpingDots = () => {
  const [dotToMove, setDotToMove] = useState(true);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    if (!animation) return;
    setTimeout(() => {
      setDotToMove(!dotToMove);
    }, 200);
  }, [dotToMove, animation]);
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