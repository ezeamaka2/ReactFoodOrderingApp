import { useContext } from 'react'

import CartContext from '../../../store/cart-context';
import MealForm from './MealForm';

import classes from './MealItem.module.css'
const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addItemHandler = amt => {
        cartCtx.addToCart({
            id: props.id,
            name: props.name,
            amount: amt,
            price: props.price
        })
    }

    const price = `$${props.price.toFixed(2)}`;
    return (
       <li className={classes.meal}>
           <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
           </div>
           <div>
                <MealForm onAddToCart={addItemHandler} id={props.id}/>
           </div>
       </li>
    )
}

export default MealItem
