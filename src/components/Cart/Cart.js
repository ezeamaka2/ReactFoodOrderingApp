import React, {useContext, useState } from 'react'

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css'

const Cart = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [order, setOrder] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalPrice = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const submittedData = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    await fetch('https://react-89efd-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        userData: data,
        order:cartCtx.items
      })
    })
    setIsSubmitting(false)
    setSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeFromCart(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addToCart({...item, amount: 1})
  }

  const cartItems = (
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem 
            key={item.id} 
            price={item.price} 
            name={item.name} 
            amount={item.amount} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}/>
        ))}
      </ul>
    );

  const orderHandler = props => {
      console.log('odering your products.....')
      setOrder(true);
  }

  const modalActions = <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
  {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}   
</div> 

  const cartModalContent = <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            {order && <Checkout onSubmitedData={submittedData} onCancel={props.onCloseCart} />}
            {!order && modalActions}
  </React.Fragment>

  const submitingOrderData = <p>Sending order.....</p>
  const successfulSubmitted = <p>Successfully submitted your order.....</p>
    
  return (
        <Modal onCloseCart={props.onCloseCart}>
          {!isSubmitting && !submitted && cartModalContent}
           {isSubmitting && submitingOrderData}
           {submitted && successfulSubmitted}
        </Modal>
    )
}

export default Cart
