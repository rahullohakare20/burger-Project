import React, { Component } from 'react';
import Layout from './Components/layout/Layout';
import BurgerBuilder from './Container/burgerBuilder/BurgerBuilder';
import CheckOut from "./Components/checkout/CheckOut";
import Orders from "./Container/orders/Orders";
import {Route} from "react-router-dom";

class App extends Component {
  render() {

      return (
      <div>
          <Layout>
                <Route path="/checkout" component={CheckOut} />
                <Route path="/orders" component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
              </Layout>
      </div>
    );
  }
}

export default App;
