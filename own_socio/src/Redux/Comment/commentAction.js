import axios from "axios";
import { API_BASE_URL } from "../api";
import { LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS } from "./commentActionType";

export const likeComment = ({ commentId, jwt }) => async (dispatch) => {
  
  dispatch({ type: LIKE_COMMENT_REQUEST });
  try {
    const response = await axios.put(
      `${API_BASE_URL}/Api/comment/like/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LIKE_COMMENT_FAILURE, payload: error.message });
  }
};
