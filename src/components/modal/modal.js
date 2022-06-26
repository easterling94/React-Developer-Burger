import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types'

const modalId = document.getElementById('modal');

const Modal = (props) => {

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') return props.closeModal(e.key);
    }
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal)
    }
  },[])

  return ReactDOM.createPortal(
      <ModalOverlay closeModal={props.closeModal}>
        <div className={styles.modal}>
          <div className={styles.wrapper}> 
            <nav className={styles.nav}>
              <h1 className={styles.header}>{props.header}</h1>
              <div id='modalCloseBtn' className={styles.closeBtn} onClick={(e) => props.closeModal(e)}>
                <CloseIcon type="primary"/>
              </div>
            </nav>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    ,
    modalId
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.string
}

export default Modal