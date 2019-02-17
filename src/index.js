import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import reducer from "./Container/store/reducer";
import {Provider} from "react-redux";

const logger = store => {
    return (next) => {
        return (action) => {
            let result = next(action);
            console.log('action' , action);
            console.log('state' , store.getState());

            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
