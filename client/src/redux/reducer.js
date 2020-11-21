import actionCreators from './action-creators';
const {CATEGORIES, PRODUCTS, CART, ORDERS, USER, USERS, FORMRESPOND, REVIEW, PURCHASEDPRODUCTS} = actionCreators;

const initialState = {
    categories: [],
    products: [],
    cart:[],
    orders:[],
    user: {},
    users: [],
    formRespond: false,
    reviews: [],
    purchased: [],
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
        case FORMRESPOND:
            return {
                ...state,
                formRespond: action.payload
            }
        case REVIEW:
            return {
                ...state,
                reviews: action.payload
            }
        case PURCHASEDPRODUCTS:
            return {
                ...state,
                purchased: action.payload
            }
        default:
            return {...state}
    }
};