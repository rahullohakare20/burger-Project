import React, { Component } from 'react';
import aux from "../auxilary";
import Modal from "../../UI/Modal/modal";


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : "test"
        }

        render() {
            return (
                <aux>
                    <Modal show>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </aux>
        );
       }
    }
}

export default withErrorHandler;