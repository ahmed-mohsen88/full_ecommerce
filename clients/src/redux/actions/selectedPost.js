import axios from "axios";

const url = "http://localhost:5000/Posts";

export const setSelectedPost = (selectedPost) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/${selectedPost._id}`);
    dispatch({ type: "SELECTEDPOST", payload: { ...data } });
  } catch (error) {
    console.log(error);
  }
};

export const refreshSelected = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/details/${id}`);
    dispatch({ type: "SELECTEDPOST", payload: { ...data } });
  } catch (error) {
    console.log(error);
  }
};
export const resetSelectedPost = () => async (dispatch) => {
  dispatch({ type: "RESET", payload: [] });
};
