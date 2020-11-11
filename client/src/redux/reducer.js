import actionCreators from './action-creators';
const {CATEGORIES, PRODUCTS} = actionCreators

const initialState = {
    categories: [],
    products: []
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
        default:
            return {...state}
    }
};