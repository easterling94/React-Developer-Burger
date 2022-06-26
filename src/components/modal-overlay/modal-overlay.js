import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = (props) => {
  return (
    <div id='modalOverlay' className={styles.overlay} onClick={(e) => props.closeModal(e)}>
      <>
        {props.children}
      </>
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay