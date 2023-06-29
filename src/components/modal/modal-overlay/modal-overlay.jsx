import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './modal-overlay.module.css'

export const ModalOverlay = ({closeModal, children}) => {
  useEffect(() => {
      const closeModalAdjusted = (e) => {
        if (e.key === 'Escape') return closeModal(e);
      }
      document.addEventListener('keydown', closeModalAdjusted);
      return () => {
        document.removeEventListener('keydown', closeModalAdjusted)
      }
    
  },[])
  return (
    <div id='modalOverlay' className={styles.overlay} onClick={(e) => closeModal(e)}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
}