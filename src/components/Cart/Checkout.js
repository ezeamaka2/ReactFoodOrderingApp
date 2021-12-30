import React, {useRef, useState} from 'react'

import classes from './Checkout.module.css'

const isValid = value => value.trim() === '';
const isFive = value => value.trim().length > 5;

const Checkout = (props) => {
    // Using useRef
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    // Using useState
    const [formInputValid, setFormInputValid] = useState(
        {
            name: true,
            street: true,
            city: true,
            postalCode: true
        }
    );
    
    const confirmHandler = (event) => {
        event.preventDefault();
        console.log('confirming your order......')

        const name = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const postalCode = postalCodeInputRef.current.value;
        const city = cityInputRef.current.value;

        const nameIsValid = !isValid(name)
        const streetIsValid = !isValid(street)
        const postalCodeIsValid = isFive(postalCode)
        const cityIsValid = !isValid(city)

        setFormInputValid({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalCodeIsValid
        })

        const formIsvalid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

        if(!formIsvalid){
            console.log('invalid inputs')
            return;
        }

        props.onSubmitedData({
            name,
            street,
            postalCode,
            city
        });

        console.log(name)
        console.log(street)
        console.log(postalCode)
        console.log(city)


        nameInputRef.current.value =''
        streetInputRef.current.value = ''
        postalCodeInputRef.current.value = ''
        cityInputRef.current.value = ''

        // setName('')
        // setStreet('')
        // setPostalCode('')
        // setCity('')
    }
    // const inputClass = !formInputValid.name ? ''
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputValid.name ? '' : classes.invalid}`}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef}/>
          {!formInputValid.name && <p>Please enter a valid name</p>}
        </div>
        <div className={`${classes.control} ${formInputValid.street ? '' : classes.invalid}`}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef}/>
          {!formInputValid.street && <p>Please enter a valid street name</p>}
        </div>
        <div className={`${classes.control} ${formInputValid.postalCode ? '' : classes.invalid}`}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalCodeInputRef}/>
          {!formInputValid.postalCode && <p>Please enter a valid postcal code number</p>}
        </div>
        <div className={`${classes.control} ${formInputValid.city ? '' : classes.invalid}`}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!formInputValid.city && <p>Please enter a valid city name</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    )
}

export default Checkout
