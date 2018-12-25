import React, { Component } from 'react';
import classes from "./modal.css";
import BackDrop from "../BackDrop/backDrop";
import Aux from '../../hoc/auxilary';

class Modal extends Component {
    shouldComponentUpdate(newProps , newState) {
        return newProps.show !== this.props.show || newProps.children !== this.props.children;
    }

    render () {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.cancelPurchasing} />
                <div style={{transform : this.props.show ? "translateY(0)" : "translateY(-100vh)"}} className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;