import React, { Component } from 'react';
import Order from '../../Components/order/order';
import axios from '../../http/orders/axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state ={
        orders : [],
        loading: false
    }

    componentDidMount(){
        let orders = [];
        this.setState({loading: true});
        axios.get('/orders.json').then((response) => {
            for( let key in response.data ) {
                orders.push({
                    ...response.data[key],
                    id : key
                });
            }
            this.setState({loading: false, orders: orders});
        }).catch(() => {
            this.setState({loading: false})
        });
    }

    render () {

        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders ,axios);