import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./authActionType";

const initialState = {
    jwt: null,
    error: null,
    loading: null,
    user: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) { // Changed from action.key to action.type
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PROFILE_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false }; // Updated to correctly assign user data
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
