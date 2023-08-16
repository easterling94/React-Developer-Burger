import { Item } from './item';
import { Ingretient } from '../../../utils/sharedTypes';
import styles from './burger-ingredients.module.scss';

type TItemsList = {
  name: string;
  ingredients: Ingretient[];
  id: string;
};

export const ItemsList = ({ name, ingredients, id }: TItemsList) => (
  <div className={styles.list}>
    <h2 className={styles.h2}>{name}</h2>
    <div id={id} className={styles.wrapper}>
      {ingredients.map((item) => {
        return <Item key={item._id} item={item} />;
      })}
    </div>
  </div>
);
