
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import {thunk}from 'redux-thunk'
import { authReducer } from './Auth/authReducer'
import { postReducer } from './Post/postReducer'
import { commentReducer } from './Comment/commentReducer'
import { messageReducer } from './Chat/chatReducer'
const rootReducer=combineReducers({
auth:authReducer,
post:postReducer,
Comment:commentReducer,
message:messageReducer,
})

export  const store=legacy_createStore(rootReducer,applyMiddleware(thunk))