import { AppHeader } from '../app-header/app-header';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';
import { ConstructorIndex } from '../constructor';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getDataEnhancer } from '../../store/enhancers/requestIngredients';
import styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch(); 
  const { ingredients, requestIngredientsFetched, requestIngredientsSuccess, requestIngredientsFailed} = useAppSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(getDataEnhancer())
  }, []);

  return (
    <div className={styles.app}>
      {ingredients && requestIngredientsSuccess ? (
        <>
          <AppHeader />
          <main className={styles.main}>
            <ConstructorIndex ingredients={ingredients} />
          </main>
        </>
        ) : requestIngredientsFailed ? (
          <>
            <Error response={requestIngredientsFailed}/>
          </>
        ) : requestIngredientsFetched ? (
          <Loader />
        ) : null
      }
    </div>
  );
}

export default App;
