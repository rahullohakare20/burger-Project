import React, { Component } from 'react';
import Layout from './Components/layout/Layout';
import BurgerBuilder from './Container/burgerBuilder/BurgerBuilder';
import CheckOut from "./Components/checkout/CheckOut";
import Orders from "./Container/orders/Orders";
import {Route} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from './Container/store/reducer';

class App extends Component {
  render() {
      const store = createStore(reducer);

      return (
      <div>
          <Provider store={store}>
              <Layout>
                <Route path="/checkout" component={CheckOut} />
                <Route path="/orders" component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
              </Layout>
          </Provider>
      </div>
    );
  }
}

export default App;
