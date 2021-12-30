import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setCartIsShown] =  useState(false);

  const showCartHandle = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return <CartProvider>
    {cartIsShow && <Cart onCloseCart={hideCartHandler} />}
    <Header onShowCart={showCartHandle}/>
    <main>
      <Meals/>
    </main>
  </CartProvider>
}

export default App;
