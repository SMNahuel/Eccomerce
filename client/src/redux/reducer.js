import actionCreators from './action-creators';
const {CATEGORIES, PRODUCTS, CART, USER} = actionCreators;

const initialState = {
    categories: [],
    products: [],
    cart:[],
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
                cart: action.payload
            }
        default:
            return {...state}
    }
};