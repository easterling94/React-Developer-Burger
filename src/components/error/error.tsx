import styles from './error.module.scss';

export const Error = ({ response }: { response: string }) => (
  <>
    <h1 className={styles.h1}>УПС... Что-то пошло не по плану</h1>
    <h2 className={styles.h2}>{response}</h2>
  </>
);
