import { CREATE_CHAT_SUCCESS, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_SUCCESS, GET_ALL_CHAT_MESSAGES_SUCCESS } from "./chatActionType"

const initialState = {
    messages: [],
    chats: [],
    loading: false,
    error: null,
    message: null
}
export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE_SUCCESS:
            return {...state,message:action.payload,messages:[...state.messages,action.payload]};
        case CREATE_CHAT_SUCCESS:
            return {...state,chats:[action.payload,...state.chats]};
        case GET_ALL_CHATS_SUCCESS:
            return  {...state,chats:action.payload};
        case GET_ALL_CHAT_MESSAGES_SUCCESS:
            return {...state,messages:action.payload };
        default:
            return state;
    }
}