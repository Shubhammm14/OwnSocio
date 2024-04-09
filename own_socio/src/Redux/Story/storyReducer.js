import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, FOLLOWERS_ACTIVE_STORY_FAILURE, FOLLOWERS_ACTIVE_STORY_REQUEST, FOLLOWERS_ACTIVE_STORY_SUCCESS, SET_STORIES_SUCCESS, USER_ACTIVE_STORY_FAILURE, USER_ACTIVE_STORY_REQUEST, USER_ACTIVE_STORY_SUCCESS, USER_STORY_FAILURE, USER_STORY_REQUEST, USER_STORY_SUCCESS } from "./storyActionType";


const initialState = {
    post: null,
    loading: false,
    error: null,
    Stories: [],
    ActiveStories: [],
    followersActiveStories: [],
};

export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STORY_REQUEST:
        case FOLLOWERS_ACTIVE_STORY_REQUEST:
        case USER_ACTIVE_STORY_REQUEST:
        case USER_STORY_REQUEST:
            return { ...state, loading: true, error: null };
            case SET_STORIES_SUCCESS:
      return {
        ...state,
        stories: action.payload,
      };
        case CREATE_STORY_SUCCESS:
            return { 
                ...state, 
                Stories: [action.payload, ...state.Stories], 
                ActiveStories: [action.payload, ...state.ActiveStories], 
                loading: false, 
                error: null 
            };
        case FOLLOWERS_ACTIVE_STORY_SUCCESS:
            return { 
                ...state, 
                followersActiveStories: action.payload, 
                loading: false, 
                error: null 
            };
        case USER_ACTIVE_STORY_SUCCESS:
            return { 
                ...state, 
                ActiveStories: action.payload, 
                loading: false, 
                error: null 
            };
        case USER_STORY_SUCCESS:
            return { 
                ...state, 
                Stories: action.payload, 
                loading: false, 
                error: null 
            };
        case CREATE_STORY_FAILURE:
        case FOLLOWERS_ACTIVE_STORY_FAILURE:
        case USER_ACTIVE_STORY_FAILURE:
        case USER_STORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default storyReducer;
