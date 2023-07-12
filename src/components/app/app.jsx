import { AppHeader } from '../app-header/app-header';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';
import { ConstructorIndex } from '../constructor';
import { getDataAPI } from '../../utils/api';
import { BASE_URL_INGREDIENTS, SERVER_RESPONSE_TYPES } from '../../utils/api';
import { AppContext } from '../../utils/appContext';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import enhancer from '../../store/enhancers/loggerEnhancer'
import styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch(); 
  const [response, setResponse] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [ingredientsForConstructor, setIngredientsForConstructor] = useState(null);

  useEffect(() => {
    dispatch(enhancer())
    const getIngredients = async () => {
      const result = await getDataAPI(BASE_URL_INGREDIENTS);
      if (result.success) {
        setIngredients(result.data)
        setIngredientsForConstructor(result.data)
        setResponse(SERVER_RESPONSE_TYPES.success)
      } else {
        setResponse(result)
      }
      return
    };

    setTimeout(() => {
      getIngredients();
    }, 2000);
  }, []);

  return (
    <div className={styles.app}>
      {ingredients && response === SERVER_RESPONSE_TYPES.success ? (
        <>
          <AppHeader />
          <main className={styles.main}>
            <AppContext.Provider value={{ingredientsForConstructor, setIngredientsForConstructor}}>
              <ConstructorIndex ingredients={ingredients} />
            </AppContext.Provider>
          </main>
        </>
      ) : response ? (
        <>
          <Error response={response}/>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
