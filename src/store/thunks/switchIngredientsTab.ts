import { AppDispatch } from '../store'
import { switchIngredientsTab } from '../slices/ingredientsSlice'
import { INGREDIENTS_TYPES } from '../../utils/consts';

export const switchIngredientsTabThunk = (ingredientsTab: string) => (dispatch: AppDispatch) => {
  const GAP = 50;
  const navId = document.getElementById('nav')!.getBoundingClientRect().bottom;
  const buns = document.getElementById('bun')!.getBoundingClientRect();
  const mains = document.getElementById('main')!.getBoundingClientRect();
  const sauses = document.getElementById('sauce')!.getBoundingClientRect();

  const current = (INGREDIENTS_TYPES.indexOf(INGREDIENTS_TYPES.filter(el => el.type === ingredientsTab)[0]))

  if (navId + GAP > buns.top && navId < buns.bottom && current !== 0) {
    dispatch(switchIngredientsTab('bun'))
    return
  }
  if (navId + GAP > mains.top && navId < mains.bottom && current !== 1) {
    dispatch(switchIngredientsTab('main'))
    return
  }
  if (navId + GAP > sauses.top && navId < sauses.bottom && current !== 2) {
    dispatch(switchIngredientsTab('sauce'))
    return
  }
  return
}