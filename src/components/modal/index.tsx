import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './index.module.css';

const modalId = document.getElementById('modal')!;

type TModal = {
  closeModal(): void;
  children: React.ReactNode;
};

export const Modal = ({ closeModal, children }: TModal) =>
  ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div
            id='modalCloseBtn'
            className={styles.closeBtn}
            data-cy='modalCloseBtn'
          >
            <CloseIcon type='primary' onClick={closeModal} />
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalId
  );
