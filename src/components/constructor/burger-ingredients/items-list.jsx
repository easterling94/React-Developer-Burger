import PropTypes from 'prop-types'
import { ingredientsPropsTypesArray } from '../../../utils/prop-types'
import { Item } from './item'
import styles from './burger-ingredients.module.scss'

export const ItemsList = ({name, ingredients, id}) => (
  <div className={styles.list}>
    <h2 className={styles.h2}>{name}</h2>
    <div id={id} className={styles.wrapper}>
      {
        ingredients.map(item => {
          return (
            <Item key={item._id} item={item}/>
          )
        })
      }
    </div>
  </div>
)

ItemsList.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: ingredientsPropsTypesArray,
  id: PropTypes.string.isRequired,
}