import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCart = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCart.price;

        let updatedItems;
        if(existingCart.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else {
            const updatedItem = {...existingCart, amount: existingCart.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR'){
        return defaultState;
    }

    return defaultState;
}

const CartProvider = props => {
    const [cartState, dispatchAction] = useReducer(cartReducer,defaultState)

    const addToCartHandler = item => {
        dispatchAction({type: 'ADD', item: item});
    }

    const removeFromCartHandler = (id) => {
        dispatchAction({type: 'REMOVE', id: id});
    }

    const clearCartHandler = () => {
        dispatchAction({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
}


export default CartProvider;