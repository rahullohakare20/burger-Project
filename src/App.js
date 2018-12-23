import React, { Component } from 'react';
import Layout from './Components/layout/Layout';
import BurgerBuilder from './Container/burgerBuilder/BurgerBuilder';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div >
          <Layout>
            <BurgerBuilder />
          </Layout>
      </div>
    );
  }
}

export default App;
