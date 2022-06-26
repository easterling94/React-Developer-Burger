import PropTypes from 'prop-types'
import styles from './ingredients-details.module.css'

const IngredientsDetails = ({data}) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={data.image} alt={`Изображение ${data.name}`}></img>
      </div>
      <h2 className={styles.name}>{data.name}</h2>
      <section className={styles.section}>
        <div className={styles.nutritionItem}>
          <p>Калории, ккал</p>
          <p>{data.calories}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p>Белки, г</p>
          <p>{data.proteins}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p>Жиры, г</p>
          <p>{data.fat}</p>
        </div>
        <div className={styles.nutritionItem}>
          <p>Углеводы, г</p>
          <p>{data.carbohydrates}</p>
        </div>
      </section>
    </div>
  )
}

IngredientsDetails.propTypes = {
  data: PropTypes.object.isRequired
}

export default IngredientsDetails