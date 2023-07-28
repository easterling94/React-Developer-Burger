import { useEffect } from 'react';
import { useAppSelector } from '../../../store/store';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({closeModal, children}) => {
  const showModal = useAppSelector(store => store.ingredients.showModal);
  const orderIngredientsSuccess = useAppSelector(store => store.order.orderIngredientsSuccess);

  useEffect(() => {
    const closeModalAdjusted = (e) => {
      if (e.key === 'Escape') return closeModal(e);
    }
    document.addEventListener('keydown', closeModalAdjusted);
    return () => {
      document.removeEventListener('keydown', closeModalAdjusted)
    }
  },[]);

  return (
    (showModal || orderIngredientsSuccess) ?
    <div id='modalOverlay' className={styles.overlay} onClick={(e) => closeModal(e)}>
      {children}
    </div>
    : null
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
}