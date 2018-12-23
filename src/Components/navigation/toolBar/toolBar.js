import React from 'react';
import classes from './toolBar.css';
import Logo from "../../logo/logo"
import NavigationItems from "../navigationItems/navigationItems";

const toolBar = (props ) => (
    <header className={classes.ToolBar}>
        <div>Menu</div>
        <Logo />
        <NavigationItems/>
    </header>
);

export default toolBar;