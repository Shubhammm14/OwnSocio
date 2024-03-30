import axios from 'axios';
import { API_BASE_URL } from "../api";
import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    GET_ALL_POST_REQUEST,
    GET_ALL_POST_SUCCESS,
    GET_ALL_POST_FAILURE,
    GET_USERS_POST_REQUEST,
    GET_USERS_POST_SUCCESS,
    GET_USERS_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    CREATE_POSTCOMMENT_REQUEST,
    CREATE_POSTCOMMENT_SUCCESS,
    CREATE_POSTCOMMENT_FAILURE,
    SAVE_POST_REQUEST,
    SAVE_POST_SUCCESS,
    SAVE_POST_FAILURE
} from "./postActionType.js";

// Action to create a new post
export const createPostAction = ({ postData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/Api/posts/user`,
            postData, // Assuming postData is a properly formatted Post object
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
};

// Action to fetch all posts
export const getAllPostAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/Api/posts`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
    }
};

// Action to fetch user-specific posts
export const getUsersPostAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/Api/posts/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
    }
};

// Action to like a post
export const likePostAction = ({ postId, jwt }) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST });
    try {
        const { data } = await axios.put(
            `${API_BASE_URL}/Api/posts/like/${postId}/user`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LIKE_POST_FAILURE, payload: error });
    }
};

// Action to create a comment on a post
export const createPostCommentAction = ({ postId, jwt, comment }) => async (dispatch) => {
    dispatch({ type: CREATE_POSTCOMMENT_REQUEST });
    try {
        const response = await axios.post(
            `${API_BASE_URL}/Api/comment/post/${postId}`,
            { content: comment }, // Send the comment content as an object
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: CREATE_POSTCOMMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_POSTCOMMENT_FAILURE, payload: error.message });
        console.error('Error creating comment:', error);
    }
};

// Action to save a post
export const savePostAction = ({ postId, jwt }) => async (dispatch) => {
    dispatch({ type: SAVE_POST_REQUEST });
    try {
        const { data } = await axios.put(
            `${API_BASE_URL}/Api/posts/save/${postId}/user`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SAVE_POST_FAILURE, payload: error });
    }
};
