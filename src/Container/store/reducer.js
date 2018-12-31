import * as actionType from './actions';

const initState = {
    ingredients: null,
    totalPrice : 20
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                }

            }
            break;

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                }

            }
            break;

        default :
            return state;
    }


}

export default reducer;