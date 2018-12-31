import React from 'react';
import classes from './order.css';

const order = (props ) => {
    let ingredient = [];

    for(let ingredientName in props.ingredients) {
        ingredient.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientNameOutPut = ingredient.map(ing => {
        return <span style={{
            textTransform:'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border : '1px solid #ccc',
            padding : '5px'
        }} key={ing.name}>{ing.name} ({ing.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredient : {ingredientNameOutPut}</p>
            <p>Price : {props.price}</p>
        </div>
    );
}

export default order;