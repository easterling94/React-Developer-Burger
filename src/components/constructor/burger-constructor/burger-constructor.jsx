import { Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from './item'
import { OrderDetails } from '../../modal/order/order'
import { OrderLoader } from '../../modal/order/order-loader'
import { useState, useMemo, useContext, useEffect } from 'react'
import { sendOrderAPI } from '../../../utils/api'
import { Modal } from '../../modal'
import { AppContext } from '../../../utils/appContext'
import { CONSTRUCTOR_ITEM_POSITIONS } from '../../../utils/consts'
import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = () => {

  const { ingredientsForConstructor, setIngredientsForConstructor } = useContext(AppContext);
  const [isLoadingToServer, setIsLoadingToServer] = useState(false)
  const [orderSendSuccess, setOrderSetSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    function prepareIngredients() {
      let updatedIngredients = [];
      for (let i = 0; i < ingredientsForConstructor.length; i++) {
        if (ingredientsForConstructor[i].type === 'bun' && prepareIngredients.hasBun === false) {
          updatedIngredients.push(ingredientsForConstructor[i]);
          prepareIngredients.hasBun = true;
        } else if (ingredientsForConstructor[i].type !== 'bun') {
          updatedIngredients.push(ingredientsForConstructor[i]);
        }
      }
      const bun = updatedIngredients.filter(el => el.type === 'bun')[0]
      updatedIngredients.splice(updatedIngredients.indexOf(bun),1)
      updatedIngredients.push(bun)
      updatedIngredients.unshift(bun)
      return updatedIngredients
    }
    prepareIngredients.hasBun = false;
    setIngredientsForConstructor(prepareIngredients())
  }, [])

  const closeModalState = () => {
    setIsLoadingToServer(false)
    setOrderSetSuccess(false)
  }

  const totalCostEval = useMemo(() => {
    return ingredientsForConstructor.reduce((acc, current) => acc + current.price, 0)
  }, [ingredientsForConstructor])

  const sendOrderToServer = async () => {
    const orderIDS = ingredientsForConstructor.map(el => el._id)
    setIsLoadingToServer(true)
    const waitForServerResponse = async () => {
      setOrderDetails(await sendOrderAPI(orderIDS))
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
          ingredientsForConstructor.map((item, i) => {
            const position = i === 0 ? CONSTRUCTOR_ITEM_POSITIONS.top : i === ingredientsForConstructor.length - 1 ? CONSTRUCTOR_ITEM_POSITIONS.bottom : CONSTRUCTOR_ITEM_POSITIONS.notBun;
            return (<Item key={uuidv4()} item={item} type={position} />)
            }
          )
        }
      </div>
      <div className={styles.summary}>
        <div className={styles.costs}>
          <span>{totalCostEval}</span>
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
            <OrderDetails orderDetails={orderDetails} />
          </Modal>
          : null
        }
      </div>
    </section>
  )
}