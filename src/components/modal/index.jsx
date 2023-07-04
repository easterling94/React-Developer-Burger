import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css';
import PropTypes from 'prop-types'

const modalId = document.getElementById('modal');

export const Modal = ({closeModal, children}) => ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styles.modal}>
        <div className={styles.wrapper}> 
          <div id='modalCloseBtn' className={styles.closeBtn} >
            <CloseIcon type="primary" onClick={(e) => closeModal(e)} />
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>
  ,
  modalId
)

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.string
}