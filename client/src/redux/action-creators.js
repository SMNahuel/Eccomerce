import axios from '../utils/axios';

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
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/cart`)
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    addProduct: function(id, quantity) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/cart`, {productId: id, quantity: quantity})
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    updateCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart`, cart)
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    confirmCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart/create`, cart)
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
        }
    },
    cancelCart: function(cart) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/cart/cancel`, cart)
            this._dispatchPromise(promise, this.CART, dispatch)
            .then(()=>this.getProducts())
            .then(()=>this.getOrders())
        }
    },

    ORDERS: 'ORDERS',
    getOrders: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/orders`)
            this._dispatchPromise(promise, this.ORDERS, dispatch)
        }
    },

    USER: "USER",
    login: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    logout: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    register: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    getMe: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/auth/me`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    addImgUser: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/auth/image`, data)
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },
    passwordChange: function(oldPassword, newPassword,){
        return dispatch => {
            console.log(oldPassword, newPassword)
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/auth/password`, { oldPassword, newPassword })
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    updateChanges: function(changes){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/auth/update`,
            changes,
            {withCredentials: true}
            )
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    USERS: "USERS",
    getUsers: function(){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/user`)
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },
    promoteUser: function(id) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/user/promote`, {id})
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },
    demoteUser: function(id) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/user/demote`, {id})
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },
    banUser: function(id) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/user/ban`, {id})
            this._dispatchPromise(promise, this.USERS, dispatch)
        }
    },

    REVIEW: 'REVIEW',
    getReviews: function(productId) {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/reviews/${productId}`)
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    makeReview: function(productId, review) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/reviews/${productId}`, review)
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    deleteReview: function(productId) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${productId}`)
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },
    getReviewByUser: function() {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/reviews`)
            this._dispatchPromise(promise, this.REVIEW, dispatch)
        }
    },

    PURCHASEDPRODUCTS: 'PURCHASEDPRODUCTS',
    getPurchased: function() {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/auth/purchased`)
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
            if (err.response) {
                alert(`Error! \n Status: ${err.response.status}\n${err.response.data}`);
            } else {
                alert(`Error! ${err}`);
            }
        })
    },
}

export default actionCreators;