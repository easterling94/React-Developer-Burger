import { useAppSelector } from '../store/store';
import { INGREDIENTS_TYPES } from '../utils/consts';
import { OrderFeed, Ingretient, OrderImages } from '../utils/sharedTypes';

export const usePrepareOrderFeed = (order: OrderFeed) => {
  const data = useAppSelector(store => store.ingredients.ingredients);
  const standartBun = data!.filter(el => el.type === 'bun')[0];
  let orderIngredients: ReadonlyArray<Ingretient> | undefined = undefined;
  let totalPrice: number | undefined = undefined;
  let images: ReadonlyArray<OrderImages> | undefined = undefined;
  let namePrepared: string | undefined = undefined; 
  if (order) {
    order = {...order, ingredients: order.ingredients.filter(el => {
      if (el && data?.filter(ingredient => ingredient._id === el).length !== 0)
      return el
    })}
    const putStandartBun = () => {
      const isBun = orderIngredientsRaw.filter(el => el.type === 'bun');
      return isBun.length === 0 ? standartBun : isBun[0]
    }
    const orderIngredientsRaw = order.ingredients.map((el: string) => data!.filter(ingredient => ingredient._id === el)[0]);
    orderIngredients = [putStandartBun(), ...orderIngredientsRaw.filter(el => el.type !== 'bun')];
    totalPrice = orderIngredients.reduce((acc, ingredient) => acc + (ingredient.type === INGREDIENTS_TYPES[0].type ?  ingredient.price * 2 : ingredient.price), 0);
    images = orderIngredients.map((ingredient: Ingretient) => ({source: ingredient.image_mobile, alt: ingredient.name}))
    namePrepared = order.name.split(' ').length > 3 ? [order.name.split(' ')[0], order.name.split(' ')[1], order.name.split(' ')[order.name.split(' ').length - 1]].join(' ') : order.name;
    return { orderIngredients, totalPrice, images, namePrepared }
  } else {
    return { orderIngredients, totalPrice, images, namePrepared }
  }
}