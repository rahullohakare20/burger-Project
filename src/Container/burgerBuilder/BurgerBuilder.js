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

class BurgerBuilder extends Component {

    state = {
        isPurchasable : false,
        isPurchasing : false,
        loading : false,
        error : false
    }

    componentDidMount() {
        // axios.get("https://burger-project-16a1a.firebaseio.com/ingredients.json").then(
        //     (response) => {
        //         this.setState({ingredients: response.data});
        //     }
        // ).catch((err)=>{
        //     this.setState({error: err});
        // });
    }

    isPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce( (sum, value) => {
            return sum + value;
        } ,0);

        return sum > 0;
    }

    isPurchasing = () => {
        this.setState({ isPurchasing: true });
    }

    cancelPurchasing = () => {
        this.setState({ isPurchasing: false });
    }

    proceedToPurchasing = () => {

        this.props.history.push({
            pathname: "/checkout"
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
                        totalPrice = {this.props.totalPrice}
                        isPurchasable = {this.isPurchasable(this.props.ingredients)}
                        ordering={this.isPurchasing}
                    />
                </Aux>
            );

            orderSummary = (<OrderSummary
                orderedIngredients={this.props.ingredients}
                proceedToPurchasing={this.proceedToPurchasing}
                cancelPurchasing={this.cancelPurchasing}
                price={this.props.totalPrice}
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
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    }
}
const mapPropsToState = (dispatch) => {
    return {
        onIngredientsAdded : (ingredientName) => {
            dispatch({type : actionType.ADD_INGREDIENT, ingredientName: ingredientName });
        },
        onIngredientsRemoved : (ingredientName) => {
            dispatch({type : actionType.REMOVE_INGREDIENT, ingredientName: ingredientName });
        }
    }
}

export default connect(mapStateToProps, mapPropsToState)(withErrorHandler(BurgerBuilder , axios));