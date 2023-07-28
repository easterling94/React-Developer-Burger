import { ingredientsPropsTypes } from '../../../utils/prop-types';
import styles from './ingredient-separate.module.scss';

export const IngredientSeparate = ({ingredient}) => (
  <div className={styles.card}>
    <h1 className={styles.header}>Детали ингредиента</h1>
    <div className={styles.img}>
      <img className={styles.img} src={ingredient.image} alt={`Изображение ${ingredient.name}`}></img>
    </div>
    <h2 className={styles.name}>{ingredient.name}</h2>
    <section className={styles.section}>
      <div className={styles.nutritionItem}>
        <p>Калории, ккал</p>
        <p>{ingredient.calories}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Белки, г</p>
        <p>{ingredient.proteins}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Жиры, г</p>
        <p>{ingredient.fat}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Углеводы, г</p>
        <p>{ingredient.carbohydrates}</p>
      </div>
    </section>
  </div>
)

IngredientSeparate.propTypes = {
  ingredient: ingredientsPropsTypes.isRequired,
}