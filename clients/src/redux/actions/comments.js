import axios from "axios";
import { setSelectedPost } from "./selectedPost";

const url = "http://localhost:5000/comments";

export const addComment =
  (id, comment, token, user, selectedPost) => async (dispatch) => {
    try {
      await axios
        .patch(
          `${url}/${id}`,
          { id, comment, user },
          {
            headers: { authorization: token },
          }
        )
        .then((data) => {
          console.log(data.data);
          dispatch({ type: "ADDCOMMENT", payload: data.data });
          return data.data;
        });
      dispatch(setSelectedPost(selectedPost));
    } catch (error) {
      console.log(error);
    }
  };

export const resetComment = () => async (dispatch) => {
  dispatch({ type: "RESETCOMMENT", payload: [] });
};
