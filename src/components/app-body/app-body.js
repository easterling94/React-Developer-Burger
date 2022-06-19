import ConstructorBody from './main-constructor/constructor-body'
import PropTypes from 'prop-types'
import ingredientsPropsTypes from '../../prop-types'
const AppBody = ({mode, ingredients}) => {
  return (
    <>
      {mode === 'constructor' ? <ConstructorBody ingredients={ingredients}/> : ''}
      {mode === 'orders' ? 'Under development...' : ''}
      {mode === 'cabinet' ? 'Under development... as well' : ''}
    </>
  )
}

AppBody.propTypes = {
  mode: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropsTypes.isRequired).isRequired
}

export default AppBody