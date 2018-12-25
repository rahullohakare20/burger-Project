import React, { Component } from 'react';
import Aux from "../auxilary";
import Modal from "../../UI/Modal/modal";


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(
                (request) => {
                    this.setState({error: null});
                    return request;
                },
                null
            );

            this.respInterceptor = axios.interceptors.response.use(
                res => res,
                (error) => {
                    this.setState({error: error.message});
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }

        removeError = () => {
            this.setState({error : null});
        }
        render() {

            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        cancelPurchasing = {this.removeError}>
                            {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
        );
       }
    }
}

export default withErrorHandler;