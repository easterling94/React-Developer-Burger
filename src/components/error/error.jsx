import PropTypes from 'prop-types';

export const Error = ({ response }) => {
  return (
    <>
      <h1 style={{textAlign: 'center', paddingTop: '30vh'}}>УПС... Что-то пошло не по плану</h1>
      <h2>{response}</h2>
    </>
  )
}

Error.propTypes = {
  response: PropTypes.string.isRequired,
}