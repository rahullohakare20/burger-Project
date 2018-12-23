import React, { Component } from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.addCount} className={classes.More}>More</button>
        <button onClick={props.removeCount}
                className={classes.Less}
                disabled ={props.disabled}>Less</button>
    </div>
);

export default BuildControl;