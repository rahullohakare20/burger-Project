import React from 'react';

import Aux from '../../hoc/auxilary';
import Button from "../../UI/Button/button";

const OrderSummary = (props ) => {
    const list = Object.keys(props.orderedIngredients).map((igKey) => {
        return <li key={igKey}>{igKey} : {props.orderedIngredients[igKey]}</li>
    });
    return (<Aux>
        <h3>Your Order</h3>
        <p>Your delicious burger is ready with :</p>
        <ul>
            {list}
        </ul>
        <p><b>Total Price : {props.price}</b></p>
        <p>Continue to checkout?</p>
        <Button btnType="Success" text="Continue" clicked={props.proceedToPurchasing}/>
        <Button btnType="Danger" text="Cancel" clicked={props.cancelPurchasing}/>
    </Aux>)
};

export default OrderSummary;