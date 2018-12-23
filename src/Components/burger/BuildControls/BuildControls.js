import React, { Component } from 'react';
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", type: "salad" },
    {label: "Meat", type: "meat"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.totalPrice}>Current Price: <b>{props.totalPrice}</b></p>
    {controls.map((element) => (
      <BuildControl
          addCount={() => props.addIngredient(element.type)}
          removeCount={() => props.removeIngredient(element.type)}
          label={element.label}
          disabled = {props.disableInfo[element.type]}
          key ={element.type}
      />
    ))}
        <button
            disabled={!props.isPurchasable}
            className={classes.OrderButton}
            onClick={() => props.ordering()}>
                Order Now
        </button>
    </div>
);

export default BuildControls;