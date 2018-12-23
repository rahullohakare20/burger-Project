import React, { Component } from 'react';
import classes from "./modal.css";
import BackDrop from "../BackDrop/backDrop";
import Aux from '../../hoc/auxilary';

const Modal = (props) => (
    <Aux>
        <BackDrop clicked={props.cancelPurchasing} show={props.showBackDrop}/>
        <div style={{transform : props.show ? "translateY(0)" : "translateY(-100vh)"}} className={classes.Modal}>
            {props.children}
        </div>
    </Aux>
)

export default Modal;