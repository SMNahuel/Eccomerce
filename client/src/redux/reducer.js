import actionCreators from './action-creators';
const {CATEGORIES, PRODUCTS, CART, ORDERS, USER, USERS} = actionCreators;

const initialState = {
    categories: [],
    products: [],
    cart:[],
    orders:[],
    user: {},
    users: []
};

export default (state = initialState, action) => {
    // console.log(action.payload)
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
        case CART:
            return {
                ...state,
                cart: action.payload
            }
        case ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case USER:
            return {
                ...state,
                user: action.payload
            }
        case USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return {...state}
    }
};