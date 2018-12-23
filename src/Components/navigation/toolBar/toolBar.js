import React from 'react';
import classes from './toolBar.css';
import Logo from "../../logo/logo"

const toolBar = (props ) => (
    <header className={classes.ToolBar}>
        <div>Menu</div>
        <Logo />
        <nav>...</nav>
    </header>
);

export default toolBar;