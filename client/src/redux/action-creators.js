import axios from 'axios';

// proceda con cuidado y amor claro!
const actionCreators = {
    CATEGORIES: 'CATEGORIES',
    getCategories: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/category`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    createCategory: function(category){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/category`, 
            category,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    updateCategory: function(id, category){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/category/${id}`, 
            category,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },
    deleteCategory: function(id) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/category/${id}`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CATEGORIES, dispatch)
        }
    },

    PRODUCTS: 'PRODUCTS',
    getProducts: function () {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/products`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    getProduct: function (id, product) {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.CART, dispatch)
        }
    },
    createProduct: function (product) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/products`,
            product,
            {withCredentials: true})
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    updateProducts: function (id, product) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`,
            product,
            {withCredentials: true})
            this._dispatchPromise(promise, this.PRODUCTS, dispatch)
        }
    },
    deleteProducts: function(id) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`,
            {withCredentials: true})
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
            .then(()=>this.getOrders())
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
    login: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/login`,
            data,
            {withCredentials: true})
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    logout: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/logout`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    register: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/register`,
            data,
            {withCredentials: true})
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    getMe: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/me`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    addImgUser: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/image`,
            data,
            {withCredentials: true})
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },
    passwordChange: function(newPassword, oldPassword){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/password`,
            oldPassword,
            newPassword,
            {withCredentials: true}
            )
            this._dispatchPromise(promise, this.CART, dispatch)
        }
    },

    REVIEW: 'REVIEW',
    getReviews: function(productId) {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/reviews/${productId}`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    makeReview: function(productId, review) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/reviews/${productId}`,
            review,
            {withCredentials: true})
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    deleteReview: function(productId) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${productId}`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    getReviewByUser: function() {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/reviews`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },

    PURCHASEDPRODUCTS: 'PURCHASEDPRODUCTS',
    getPurchased: function() {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/purchased`,
            {withCredentials: true})
            this._dispatchPromise(promise, this.PURCHASEDPRODUCTS, dispatch)
        }
    },

    FORMRESPOND: 'FORMRESPOND',

    _dispatchPromise: function(promise, type, dispatch){
        return promise
        .then(({data}) => {
            dispatch({ type: type, payload: data });
        })
        .catch(err => {
            alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
        })
    },
}

export default actionCreators;