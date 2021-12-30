import React from 'react'

import HeaderCartButton from './HeaderCartButton'

import classes from "./Header.module.css"

// Address of the image
import mealImage from '../../assets/meals.jpg'

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeal</h1>
            <HeaderCartButton onShowCart={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt='A table ful of delicious meal'/>
        </div>
    </React.Fragment>
}

export default Header
