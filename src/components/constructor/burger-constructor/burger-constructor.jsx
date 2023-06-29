import { ingredientsPropsTypesArray } from '../../../utils/prop-types'
import { Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from './item'
import { OrderDetails } from '../../modal/order/order'
import { OrderLoader } from '../../modal/order/order-loader'
import { useState, useCallback } from 'react'
import styles from './burger-constructor.module.scss'
import { Modal } from '../../modal'

export const BurgerConstructor = ({ingredients}) => {
  const [isLoadingToServer, setIsLoadingToServer] = useState(false)
  const [orderSendSuccess, setOrderSetSuccess] = useState(false);

  const closeModalState = () => {
    setIsLoadingToServer(false)
    setOrderSetSuccess(false)
  }

  const totalCostEval = useCallback(() => {
    return ingredients.reduce((acc, current) => acc + current.price, 0)
  }, [ingredients])

  const sendOrderToServer = async () => {
    setIsLoadingToServer(true)
    const waitForServerResponse = async () => {
      setTimeout(() => {
        setIsLoadingToServer(false);
        setOrderSetSuccess(true)
      }, 2000)
    }
    await waitForServerResponse();
  }
  return (
    <section className={styles.section}>
      <div className={styles.constructor}>
        {
          ingredients.map((item, i) => {
            const position = i === 0 ? 'top' : i === ingredients.length - 1 ? 'bottom' : undefined;
            return (<Item key={item._id} item={item} type={position} i={i}/>)
            }
          )
        }
      </div>
      <div className={styles.summary}>
        <div className={styles.costs}>
          <span>{totalCostEval()}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='medium' onClick={sendOrderToServer} htmlType='button'>Оформить заказ</Button>
        {
          isLoadingToServer? 
          <Modal closeModal={closeModalState}>
            <OrderLoader />
          </Modal>
          : 
          orderSendSuccess ? 
          <Modal closeModal={closeModalState}>
            <OrderDetails />
          </Modal>
          : null
        }
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropsTypesArray
}