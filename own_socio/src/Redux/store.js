
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import {thunk}from 'redux-thunk'
import { authReducer } from './Auth/authReducer'
import { postReducer } from './Post/postReducer'
import { commentReducer } from './Comment/commentReducer'
const rootReducer=combineReducers({
auth:authReducer,
post:postReducer,
Comment:commentReducer,
})

export  const store=legacy_createStore(rootReducer,applyMiddleware(thunk))