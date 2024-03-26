import { CREATE_POSTCOMMENT_FAILURE, CREATE_POSTCOMMENT_REQUEST, CREATE_POSTCOMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_REQUEST, SAVE_POST_SUCCESS } from "./postActionType";

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
        case CREATE_POSTCOMMENT_SUCCESS:
            return { ...state, newComment: action.payload, postcomments: [action.payload, ...state.postcomments], loading: false, error: null }
            case SAVE_POST_SUCCESS:
  // Extract the saved post data from action.payload
  const savedPostData = action.payload;

  // Check if the saved post already exists in the savedPost array
  const isAlreadySaved = state.savedPost.some(savedPost => savedPost.id === savedPostData.id);

  if (isAlreadySaved) {
    // If the saved post already exists, remove it from the savedPost array
    const updatedSavedPost = state.savedPost.filter(savedPost => savedPost.id !== savedPostData.id);
    console.log("savedPsot",updatedSavedPost);
    return {
      ...state,
      savePost: savedPostData, // Update savePost with the saved post data from action.payload
      savedPost: updatedSavedPost,
      loading: false,
      error: null
    };
  } else {
    // If the saved post is not already saved, add it to the beginning of the savedPost array
    const updatedSavedPost = [savedPostData, ...state.savedPost];
    console.log("savedpost",updatedSavedPost)
    return {
      ...state,
      savePost: savedPostData, // Update savePost with the saved post data from action.payload
      savedPost: updatedSavedPost,
      loading: false,
      error: null
    };
  }

              


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
        case CREATE_POSTCOMMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
