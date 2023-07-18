import { AppHeader } from '../app-header/app-header';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';
import { ConstructorIndex } from '../constructor';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getDataEnhancer } from '../../store/enhancers/requestIngredients';
import { RequestResolver } from '../request-resolver/request-resolver';
import styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch(); 
  const { ingredients, requestIngredientsFetched, requestIngredientsSuccess, requestIngredientsFailed} = useAppSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(getDataEnhancer())
  }, []);

  return (
    <div className={styles.app}>
      <RequestResolver isLoading={requestIngredientsFetched} isError={requestIngredientsFailed} isSuccess={requestIngredientsSuccess}>
        <Loader />
        <>
          <Error response={requestIngredientsFailed}/>
        </>
        <>
          <AppHeader />
          <main className={styles.main}>
            <ConstructorIndex ingredients={ingredients} />
          </main>
        </>
      </RequestResolver>
    </div>
  );
}

export default App;
