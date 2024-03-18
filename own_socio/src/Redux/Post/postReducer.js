import { CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./postActionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_POST_SUCCESS:
            return { ...state, post: action.payload, posts: [action.payload, ...state.posts], error: null, loading: false };
        case GET_ALL_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false, error: null };
        case GET_USERS_POST_SUCCESS:
            return { ...state, post: action.payload, loading: false, error: null };
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.id === action.payload.id ? action.payload : item),
                loading: false,
                error: null
            };
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case LIKE_POST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
