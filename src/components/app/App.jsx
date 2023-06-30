import { AppHeader } from '../app-header/app-header';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';
import { ConstructorIndex } from '../constructor';
import { getData } from '../../utils/api';
import { API, SERVER_RESPONSE_TYPES } from '../../utils/consts';
import { useEffect, useState } from 'react';
import styles from './app.module.scss';

function App() {
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      const result = await getData(API);
      if (result === SERVER_RESPONSE_TYPES.error) {
        setData(SERVER_RESPONSE_TYPES.error);
      } else {
        setData(SERVER_RESPONSE_TYPES.success);
        setIngredients(result.data);
      }
    };

    setTimeout(() => {
      getIngredients();
    }, 2000);
  }, []);
  return (
    <div className={styles.app}>
      {ingredients && data === SERVER_RESPONSE_TYPES.success ? (
        <>
          <AppHeader />
          <main className={styles.main}>
            <ConstructorIndex ingredients={ingredients} />
          </main>
        </>
      ) : data === SERVER_RESPONSE_TYPES.error ? (
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
