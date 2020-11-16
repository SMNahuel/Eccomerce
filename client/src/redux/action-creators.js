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
    getCart: function() {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/cart`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    addProduct: function(id, quantity) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/cart`,
            {productId: id, quantity: quantity},
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    updateCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart`,
            cart,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    confirmCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart/create`,
            cart,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    cancelCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart/cancel`,
            cart,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },

    ORDERS: 'ORDERS',
    getOrders: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/orders`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.ORDERS, dispatch)
        }
    },

    USER: "USER",

    _dispatchPromise: function(promise, type, dispatch){
        return promise
        .then(({data}) => {
            dispatch({ type: type, payload: data });
        })
        .catch(err => alert("Error!! " + err))
    },
}

export default actionCreators;