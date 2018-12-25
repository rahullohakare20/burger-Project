import React, { Component } from 'react';

import Burger from '../../Components/burger/Burger';
import Aux from '../../hoc/auxilary';
import BuildControls from "../../Components/burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/modal";
import OrderSummary from "../../Components/orderSummary/OrderSummary";
import axios from "../../http/orders/axios-order.js";
import Spinner from "../../UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES =  {
    salad: 5,
    meat: 50,
    bacon: 40,
    cheese: 10
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice : 20,
        isPurchasable : false,
        isPurchasing : false,
        loading : false,
        error : false
    }

    componentDidMount() {
        axios.get("https://burger-project-16a1a.firebaseio.com/ingredients.json").then(
            (response) => {
                this.setState({ingredients: response.data});
            }
        ).catch((err)=>{
            this.setState({error: err});
        });
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        let newPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;
        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.isPurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0) return;

        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        let newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

        updatedIngredients[type] = updatedCount;

        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.isPurchasable(updatedIngredients);
    }

    isPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce( (sum, value) => {
            return sum + value;
        } ,0);

        this.setState({isPurchasable : sum > 0});
    }

    isPurchasing = () => {
        this.setState({ isPurchasing: true });
    }

    cancelPurchasing = () => {
        this.setState({ isPurchasing: false });
    }

    proceedToPurchasing = () => {
        this.setState({loading: true});

        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name: "Rahul Lohakare",
                address : {
                    city:"Pune",
                    zipcode:"411045",
                    street: "balewadi Road"
                },
                email: "rahullohakare20@gmail.com"
            },
            deliveryMethod : "fastest"
        };

        axios.post("/orders.json", order).then((response) => {
            this.setState({ loading: false });
            this.cancelPurchasing();
        });
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };

        for( let key in disableInfo ) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary;
        let burger = this.state.error ? "Error in fetching data" : <Spinner/>;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disableInfo ={disableInfo}
                        totalPrice = {this.state.totalPrice}
                        isPurchasable = {this.state.isPurchasable}
                        ordering={this.isPurchasing}
                    />
                </Aux>
            );

            orderSummary = (<OrderSummary
                orderedIngredients={this.state.ingredients}
                proceedToPurchasing={this.proceedToPurchasing}
                cancelPurchasing={this.cancelPurchasing}
                price={this.state.totalPrice}
            />);

            if(this.state.loading) {
                orderSummary = (<Spinner/>);
            }
        }

        return (
            <Aux>
                <Modal show={this.state.isPurchasing}  cancelPurchasing={this.cancelPurchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder , axios);