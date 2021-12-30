import {useRef, useState} from 'react'

import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef()

   const submitHandler = events => {
       events.preventDefault();

        // Get the value of the entered amount
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(enteredAmountNumber);
   }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                lable='Amount'
                input ={{
                    ref: (amountInputRef),
                    id: 'amount_'+props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button >+Add</button>
            {!amountIsValid && <p>Enter a number between (1 - 5)</p>}
        </form>
    )
}

export default MealForm
