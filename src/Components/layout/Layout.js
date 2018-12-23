import React from 'react';

import Aux from '../../hoc/auxilary';
import classes from './Layout.css';
import ToolBar from '../navigation/toolBar/toolBar';

const layout = ( props ) => (
    <Aux>
        <ToolBar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;