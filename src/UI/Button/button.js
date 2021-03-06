import React, { Component } from 'react';
import classes from "./button.css";

const Button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(" ")}
        onClick={props.clicked}
        disabled={props.disabled}>
            {props.text}
    </button>
);

export default Button;