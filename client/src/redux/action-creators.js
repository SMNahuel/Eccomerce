import axios from 'axios';

// proceda con cuidado y amor claro!
const actionCreators = {
    CATEGORIES: 'CATEGORIES',
    getCategories: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/category`)
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    createCategory: function(category){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/category`, category)
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    updateCategory: function(id, category){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/category/${id}`, category)
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    deleteCategory: function(id) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/category/${id}`)
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },

    PRODUCTS: 'PRODUCTS',
    getProducts: function () {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/products`)
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    getProduct: function (id, product) {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
            this._dispatchPromise(promise, this.CART, dispatch)
        }
    },
    createProduct: function (product) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/products`, product)
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    updateProducts: function (id, product) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, product)
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    deleteProducts: function(id) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },

    CART: 'CART',
    addProduct: function(id, quantity) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
                productId: id,
                quantity: quantity
            }, {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
        }
    },
    updateCart: function(id, cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart/${id}`, cart, {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
        }
    },

    USER: "USER",

    _dispatchPromise: function(promise, type, dispatch){
        promise
        .then(r => (console.log(r), r))
        .then(({data}) => {
            dispatch({ type: type, payload: data });
        })
        .catch(err => alert("Error!! " + err))
    },
}

export default actionCreators;