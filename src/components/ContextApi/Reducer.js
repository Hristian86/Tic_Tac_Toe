import { ADD_TO_BASKET, REMOVE_ITEM_FROM_BASKET, GET_ITEMS, CHECK_USER, REMOVE_USER, SET_CATEGORY_PERANT, REMOVE_ALL_FROM_BASKET } from "./Types";

// initail state of the app

export const initialState = {
    basket: [],
    user: [],
    fetchData: [],
    categoryPerant: [],
};

const removeReducer = (state) => {

    const newState = state.user

    return newState
}

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) =>
        item.price + amount, 0);

const Reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {
        case REMOVE_USER:
            // removing user
            console.log(state);
            return {
                ...state,
                user: [...state.user.filter(i => i.user == "remove user :0")]
            };
            break;
        case SET_CATEGORY_PERANT:
            // Set category root perant
            return {
                ...state,
                categoryPerant: [...state.categoryPerant, action.categoryPerant.items]
            };
            break;
        case CHECK_USER:
            // get user here
            return {
                ...state,
                user: [...state.user, action.user]
            };
            break;
        case GET_ITEMS:
            // get items from back end
            return {
                ...state,
                fetchData: [...state.fetchData, action.fetcheData.items]
            };
            break;
        case REMOVE_ITEM_FROM_BASKET:
            // removing item from the basket

            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.removefromBasket.id);
            if (index >= 0) {
                // removing existing id
                newBasket.splice(index, 1);
            } else {
                alert("Product does not exist" + action.removefromBasket.id)
            }

            return {
                ...state,
                basket: newBasket
            };

            //return {
            //    ...state,
            //    basket: [...state.basket.filter(x => x.id !== action.removefromBasket.id)]
            //};
            break;
        case ADD_TO_BASKET:
            // adding items to basek
            return {
                ...state,
                basket: [...state.basket, action.items]
            };
            break;
        case REMOVE_ALL_FROM_BASKET:
            // adding items to basek
            return {
                ...state,
                basket: [...state.basket.filter(i => i.id == 0)]
            };
            break;
        default:
            return state;
    }
}

export default Reducer;