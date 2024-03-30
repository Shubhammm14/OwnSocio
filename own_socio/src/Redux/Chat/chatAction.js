import axios from "axios";
import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS, GET_ALL_CHAT_MESSAGES_FAILURE, GET_ALL_CHAT_MESSAGES_REQUEST, GET_ALL_CHAT_MESSAGES_SUCCESS } from "./chatActionType";
import { API_BASE_URL } from "../api";

export const createMessage = ({msg,image,video, chatId,sendMessagetoServer }) => async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    console.log(msg)
    try {
        const { data } = await axios.post(`${API_BASE_URL}/Api/create/msg/${chatId}`, { content:msg,image:image,video:video }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        sendMessagetoServer(data)
        dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error });
    }
};

export const findChatMessages = ({ chatId }) => async (dispatch) => {
    console.log("....",chatId)
    dispatch({ type: GET_ALL_CHAT_MESSAGES_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/Api/chat/${chatId}/messages`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        console.log(data)
        dispatch({ type: GET_ALL_CHAT_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_CHAT_MESSAGES_FAILURE, payload: error });
    }
};

export const createChat = (userData) => async (dispatch) => {
    dispatch({ type: CREATE_CHAT_REQUEST });
    console.log(userData)
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/Api/user/chat`,
            { id: userData }, // Extract the id from userData object
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }
        );
        dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_CHAT_FAILURE, payload: error });
    }
};

export const findUserChat = () => async (dispatch) => {
    dispatch({ type: GET_ALL_CHATS_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/Api/chats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error });
    }
};
