import React, { Component } from 'react';
import classes from "./backDrop.css";

const BackDrop = (props) => (
    props.show ? <div onClick={() => props.clicked()} className={classes.BackDrop}></div> : null
);

export default BackDrop;