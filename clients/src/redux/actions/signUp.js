import axios from "axios";
const url = "http://localhost:5000/signup";

export const sendData = (data, navigate) => async (dispatch) => {
  try {
    const p = await axios.post(url, data);
    await dispatch({ type: "CREATE", payload: JSON.stringify(p) });
    dispatch(signIN(data, navigate));
  } catch (error) {
    console.log(error);
  }
};

export const signIN = (data, navigate) => async (dispatch) => {
  try {
    await axios.post(`${url}/signIn`, data).then((data) => {
      localStorage.setItem("profile", JSON.stringify(data.data));
      navigate("/home");
      dispatch({ type: "signIn", payload: data.data });
    });
  } catch (error) {
    console.log(error);
    navigate("/");
  }
};
