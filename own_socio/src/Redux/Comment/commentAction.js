import axios from "axios";
import { API_BASE_URL } from "../api";
import { LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS } from "./commentActionType";

export const likeComment = ({ commentId, jwt }) => async (dispatch) => {
  console.log("receive", commentId);
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
    console.log(response,"res")
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LIKE_COMMENT_FAILURE, payload: error.message });
  }
};
