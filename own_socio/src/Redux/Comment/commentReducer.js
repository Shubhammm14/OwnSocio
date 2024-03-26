import { LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS } from "./commentActionType";

const initialState = {

    loading: false,
    error: null,
    like: null,
    likedcomments: [],
};
export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_COMMENT_REQUEST:
            return {...state,loading:true,error:false};
        case LIKE_COMMENT_SUCCESS:
            return{...state,like:action.payload,likedcomments:[action.payload,...state.likedcomments],loading:false,error:false};
        case LIKE_COMMENT_FAILURE:
            return {...state,loading:false,error:true};
            default:
                return state;
    }
}