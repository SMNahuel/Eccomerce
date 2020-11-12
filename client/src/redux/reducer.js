import actionCreators from './action-creators';
import { USER } from './action-creators'
const {CATEGORIES, PRODUCTS} = actionCreators

const initialState = {
    categories: [],
    products: [],
    user: {
        name: "",
        password: "",
        email: "",
    }
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
                user: {
                    name: action.payload.name,
                    password: action.payload.password,
                    email: action.payload.email
                }
            }
        default:
            return {...state}
    }
};