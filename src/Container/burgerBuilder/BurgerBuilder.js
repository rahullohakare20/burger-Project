import React, { Component } from 'react';

import Burger from '../../Components/burger/Burger';
import Aux from '../../hoc/auxilary';
import BuildControls from "../../Components/burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/modal";
import OrderSummary from "../../Components/orderSummary/OrderSummary";
import axios from "../../http/orders/axios-order.js";
import Spinner from "../../UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionType from '../store/actions'
import {connect} from 'react-redux';

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
        // this.props.onIngredientsAdded();
        const updatedCount = this.props.ingredients[type] + 1;
        const updatedIngredients = {...this.props.ingredients};
        updatedIngredients[type] = updatedCount;

        let newPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;
        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.isPurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.props.ingredients[type] <= 0) return;

        const updatedCount = this.props.ingredients[type] - 1;
        const updatedIngredients = {...this.props.ingredients};
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
        const queryParameter = [];
        for(let i in this.props.ingredients) {
            queryParameter.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParameter.push(encodeURIComponent('totalPrice') + "=" + encodeURIComponent(this.state.totalPrice));
        console.log(queryParameter);
        let querystr = queryParameter.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search : querystr
        });
    }

    render () {
        const disableInfo = {
            ...this.props.ingredients
        };

        for( let key in disableInfo ) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary;
        let burger = this.state.error ? "Error in fetching data" : <Spinner/>;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onIngredientsAdded}
                        removeIngredient={this.props.onIngredientsRemoved}
                        disableInfo ={disableInfo}
                        totalPrice = {this.state.totalPrice}
                        isPurchasable = {this.state.isPurchasable}
                        ordering={this.isPurchasing}
                    />
                </Aux>
            );

            orderSummary = (<OrderSummary
                orderedIngredients={this.props.ingredients}
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

const mapStateToProps = (state) => {
    return {
        ingredients : state.ingredients
    }
}
const mapPropsToState = (dispatch) => {
    return {
        onIngredientsAdded : (ingredientsName) => {
            dispatch({type : actionType.ADD_INGREDIENT, value: ingredientsName });
        },
        onIngredientsRemoved : (ingredientsName) => {
            dispatch({type : actionType.REMOVE_INGREDIENT, value: ingredientsName });
        }
    }
}

export default connect(mapStateToProps, mapPropsToState)(withErrorHandler(BurgerBuilder , axios));