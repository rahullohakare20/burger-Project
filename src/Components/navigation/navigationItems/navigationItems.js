import React  from 'react';
import classes from "./navigationItems.css";
import NavigationItem from "./navigationItem/NavigationItem"

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true} >Burger builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;