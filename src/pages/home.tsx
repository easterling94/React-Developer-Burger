import { ConstructorIndex } from '../components/constructor';
import { useAppSelector } from '../store/store';

export const HomePage = () => {
  const { ingredients } = useAppSelector(store => store.ingredients)
  return (
    ingredients ? <ConstructorIndex /> : null
  )
}