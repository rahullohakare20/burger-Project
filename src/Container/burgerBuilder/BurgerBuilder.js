import React, { Component } from 'react';

import Burger from '../../Components/burger/Burger';
import Aux from '../../hoc/auxilary';
import BuildControls from "../../Components/burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/modal";
import OrderSummary from "../../Components/orderSummary/OrderSummary";

const INGREDIENTS_PRICES =  {
    salad: 5,
    meat: 50,
    bacon: 40,
    cheese: 10
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice : 20,
        isPurchasable : false,
        isPurchasing : false
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
        alert("done");
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };

        for( let key in disableInfo ) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.isPurchasing} showBackDrop={this.state.isPurchasing} cancelPurchasing={this.cancelPurchasing}>
                    <OrderSummary
                        orderedIngredients={this.state.ingredients}
                        proceedToPurchasing={this.proceedToPurchasing}
                        cancelPurchasing={this.cancelPurchasing}
                        price={this.state.totalPrice}
                    />
                </Modal>
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
    }
}

export default BurgerBuilder;