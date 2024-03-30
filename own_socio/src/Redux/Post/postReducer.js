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
} from "./postActionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    postcomments: [],
    newComment: null,
    savePost: null,
    savedPost: []
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case CREATE_POSTCOMMENT_REQUEST:
        case SAVE_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_POST_SUCCESS:
            return { ...state, post: action.payload, loading: false, error: null };
        case GET_ALL_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false, error: null };
        case GET_USERS_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false, error: null };
        case LIKE_POST_SUCCESS:
            const updatedPosts = state.posts.map((item) => item.id === action.payload.id ? action.payload : item);
            return { ...state, like: action.payload, posts: updatedPosts, loading: false, error: null };
        case CREATE_POSTCOMMENT_SUCCESS:
            return { ...state, newComment: action.payload, postcomments: [action.payload, ...state.postcomments], loading: false, error: null };
        case SAVE_POST_SUCCESS:
            const savedPostData = action.payload;
            const isAlreadySaved = state.savedPost.some(savedPost => savedPost.id === savedPostData.id);
            if (isAlreadySaved) {
                const updatedSavedPost = state.savedPost.filter(savedPost => savedPost.id !== savedPostData.id);
                return { ...state, savedPost: updatedSavedPost, loading: false, error: null };
            } else {
                const updatedSavedPost = [savedPostData, ...state.savedPost];
                return { ...state, savedPost: updatedSavedPost, loading: false, error: null };
            }
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case CREATE_POSTCOMMENT_FAILURE:
        case SAVE_POST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
