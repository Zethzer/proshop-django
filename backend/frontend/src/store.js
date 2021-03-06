import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer, productTopRatedReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderListUserReducer,
    orderPayReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListUser: orderListUserReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
const userInfosFromStorage = localStorage.getItem('userInfos') ?
    JSON.parse(localStorage.getItem('userInfos')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfos: userInfosFromStorage }
}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
