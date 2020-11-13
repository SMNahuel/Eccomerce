import actionCreators from './action-creators';
import { USER } from './action-creators'
const {CATEGORIES, PRODUCTS, CART} = actionCreators;

const initialState = {
    categories: [],
    products: [],
    cartProducts:[],
    user: {}
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case USER:
            return {
                ...state,
                user: action.payload
            }
        case CART:
            return {
                ...state,
                cartProducts: action.payload
            }
        default:
            return {...state}
    }
};