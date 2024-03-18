
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import {thunk}from 'redux-thunk'
import { authReducer } from './Auth/authReducer'
import { postReducer } from './Post/postReducer'
const rootReducer=combineReducers({
auth:authReducer,
post:postReducer,
})

export  const store=legacy_createStore(rootReducer,applyMiddleware(thunk))