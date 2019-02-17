import * as actionType from './actions';

const initState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice : 20
}

const INGREDIENTS_PRICES =  {
    salad: 5,
    meat: 50,
    bacon: 40,
    cheese: 10
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]

            }
            break;

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]

            }
            break;

        default :
            return state;
    }


}

export default reducer;