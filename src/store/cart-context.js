import react from "react";

const CartContext = react.createContext({
    items: [],
    totalAmount: 0,
    addToCart: (item) => {},
    removeFromCart: (id) => {},
    clearCart: () => {}
})

export default CartContext;