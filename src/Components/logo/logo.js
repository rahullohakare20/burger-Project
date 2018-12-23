import React from 'react';
import classes from './logo.css';
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = (props ) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="logo" />
    </div>
);

export default logo;