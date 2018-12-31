import React , {Component} from 'react';

import CheckOutSummary from './checkoutSummary/CheckOutSummary';
import ContactData from './contactData/ContactData';
import {Route} from 'react-router-dom';

class CheckOut extends Component {
    state ={
        ingredients : {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice : 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};

        for(let params of query.entries()) {
            if(params[0] === "totalPrice" ) {
                this.setState({totalPrice : params[1]});
            } else {
                ingredients[params[0]] = +params[1];
            }
        }

        this.setState({ingredients:ingredients});
    }

    handleCheckout = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    handleCancelCheckout = () => {
        this.props.history.goBack();
    }

    render(){
      return (
          <div>
            <CheckOutSummary
                ingredients={this.state.ingredients}
                proceed={this.handleCheckout}
                cancel={this.handleCancelCheckout}
            />
            <Route
                path={this.props.match.path + "/contact-data"}
                render = {() => (<ContactData
                {...this.props}
                ingredients = {this.state.ingredients}
                totalPrice = {this.state.totalPrice}
                />)}

            />
          </div>
      );
  }
}

export default CheckOut;