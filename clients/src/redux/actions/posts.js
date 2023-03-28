import axios from "axios";

const url = "http://localhost:5000/Posts";

export const getPosts = (token) => async (dispatch) => {
  try {
    const data = await axios
      .get(url, {
        headers: { authorization: token },
      })
      .then((data) => {
        return data.data;
      });
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, token) => async (dispatch) => {
  try {
    const data = await axios.post(url, post, {
      headers: { authorization: token },
    });
    dispatch({ type: "CREATE", payload: JSON.stringify(data) });
    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePost = (id, post, token) => async (dispatch) => {
  try {
    await axios.patch(`${url}/${id}`, post, {
      headers: { authorization: token },
    });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const DeletedPost = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${id}`, {
      headers: { authorization: token },
    });
    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};
