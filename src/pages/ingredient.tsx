import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDataThunk } from '../store/thunks/requestIngredients';
import { IngredientSeparate } from '../components/constructor/burger-ingredients/ingredient-separate';

export const IngredientPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const ingredient = useAppSelector(store => store.ingredients.ingredientSeparate);

  useEffect(() => {
    const id = location.pathname.slice(13)
    dispatch(getDataThunk(id))
  }, [dispatch])

  return (
    ingredient ? 
    <IngredientSeparate ingredient={ingredient}/>
    : null
  )
}