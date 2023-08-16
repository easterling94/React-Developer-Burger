import { useEffect } from 'react';
import { useAppSelector } from '../../../store/store';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  closeModal(): void;
  children: React.ReactNode;
};

type KeyboardEvent = {
  key: string;
};

export const ModalOverlay = ({ closeModal, children }: TModalOverlay) => {
  const showModal = useAppSelector((store) => store.ingredients.showModal);
  const showModalOrder = useAppSelector((store) => store.order.showModalOrder);

  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [closeModal]);

  return showModal || showModalOrder ? (
    <div id='modalOverlay' className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  ) : null;
};
