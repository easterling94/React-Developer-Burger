import { AppHeader } from '../app-header/app-header';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';
import { ConstructorIndex } from '../constructor';
import { API, getData, FETCH_ERROR } from '../../utils/api';
import { useEffect, useState } from 'react';
import styles from './app.module.scss';

function App() {
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      const result = await getData(API);
      if (result === FETCH_ERROR) {
        setData('error');
      } else {
        setData('success');
        setIngredients(result.data);
      }
    };

    setTimeout(() => {
      getIngredients();
    }, 2000);
  }, []);
  return (
    <div className={styles.app}>
      {ingredients && data === 'success' ? (
        <>
          <AppHeader />
          <main className={styles.main}>
            <ConstructorIndex ingredients={ingredients} />
          </main>
        </>
      ) : data === 'error' ? (
        <>
          <Error />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
