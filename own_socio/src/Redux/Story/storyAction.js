
import axios from "axios";

import { API_BASE_URL } from "../api";
import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, FOLLOWERS_ACTIVE_STORY_FAILURE, FOLLOWERS_ACTIVE_STORY_REQUEST, FOLLOWERS_ACTIVE_STORY_SUCCESS, SET_STORIES_REQUEST, USER_ACTIVE_STORY_FAILURE, USER_ACTIVE_STORY_REQUEST, USER_ACTIVE_STORY_SUCCESS, USER_STORY_FAILURE, USER_STORY_REQUEST, USER_STORY_SUCCESS } from "./storyActionType";

// Action to create a new post
export const createstoryAction = ({stryData, jwt }) => async (dispatch) => {
    console.log("storydta",stryData)
    dispatch({ type: CREATE_STORY_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/Api/create/story`,
            stryData, // Assuming postData is a properly formatted Post object
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        dispatch({ type: CREATE_STORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_STORY_FAILURE, payload: error });
    }
};
// Action to create a new post
export const setStories = (stories) => ({
    type: SET_STORIES_REQUEST,
    payload: stories,
  });
export const followersActiveStoryAction = () => async (dispatch) => {
    dispatch({ type: FOLLOWERS_ACTIVE_STORY_REQUEST });
    try {
        const { data } = await axios.get(
            `${API_BASE_URL}/Api/users/follower/story`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        );
        console.log("......,",data)
        dispatch({ type: FOLLOWERS_ACTIVE_STORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FOLLOWERS_ACTIVE_STORY_FAILURE, payload: error });
    }
};
// Action to create a new post
export const UserActiveStoryAction = ({id, jwt }) => async (dispatch) => {
    dispatch({ type: USER_ACTIVE_STORY_REQUEST });
    try {
        const { data } = await axios.get(
            `${API_BASE_URL}/Api/user/active/story/${id}`,
 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        dispatch({ type: USER_ACTIVE_STORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_ACTIVE_STORY_FAILURE, payload: error });
    }
};

// Action to create a new post
export const usersAllStoryAction = ({id,jwt }) => async (dispatch) => {
    dispatch({ type: USER_STORY_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/Api/user/story/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        dispatch({ type:USER_STORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_STORY_FAILURE, payload: error });
    }
};
