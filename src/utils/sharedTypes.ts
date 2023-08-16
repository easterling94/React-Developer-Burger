import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

export type ingredientsTab = 'bun' | 'main' | 'sauce';

export interface Ingretient {
  _id: string;
  name: string;
  type: ingredientsTab;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type UniqueIdIngredient = Ingretient & {
  uuid: string;
};

export type TIconTypesObj = { [key in TIconProps['type']]: key };
