import { ingredientsPropsTypes } from '../../../utils/prop-types'
import styles from './ingredient.module.css'

export const ModalIngredients = ({item}) => {
  return (
    <div className={styles.card} onClick={(e) => e.stopPropagation()}>
    <h1 className={styles.header}>Детали ингредиента</h1>
    <div className={styles.img}>
      <img className={styles.img} src={item.image} alt={`Изображение ${item.name}`}></img>
    </div>
    <h2 className={styles.name}>{item.name}</h2>
    <section className={styles.section}>
      <div className={styles.nutritionItem}>
        <p>Калории, ккал</p>
        <p>{item.calories}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Белки, г</p>
        <p>{item.proteins}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Жиры, г</p>
        <p>{item.fat}</p>
      </div>
      <div className={styles.nutritionItem}>
        <p>Углеводы, г</p>
        <p>{item.carbohydrates}</p>
      </div>
    </section>
  </div>
  )
}


ModalIngredients.propTypes = {
  item: ingredientsPropsTypes.isRequired,
}