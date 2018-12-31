import React from 'react';

import classes from './CheckOutSummary.css';
import Burger from "../../burger/Burger";
import Button from "../../../UI/Button/button";

const checkOutSummary = (props) => (
    <div className={classes.CheckOutSummary}>
        <p><b>Your delicious order will look like this : </b></p>
        <div style={{width: '100%', height:'300px', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button clicked={props.proceed} text="Proceed" btnType="Success" />
        <Button clicked={props.cancel} text="Cancel" btnType="Danger" />
    </div>
);

export default checkOutSummary;