import React , {Component} from 'react';

import CheckOutSummary from './checkoutSummary/CheckOutSummary';
import {Route} from 'react-router-dom';
import ContactData from './contactData/contactData';
import {connect} from 'react-redux';

class CheckOut extends Component {

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
                ingredients={this.props.ingredients}
                proceed={this.handleCheckout}
                cancel={this.handleCancelCheckout}
            />
            <Route
                path={this.props.match.path + "/contact-data"}
                component = {ContactData}
            />
          </div>
      );
  }
}

const mapStateToProps = (state) => {
    return {
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    }
}
export default connect(mapStateToProps)(CheckOut);