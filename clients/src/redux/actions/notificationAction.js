import axios from "axios";

export const getNotes = () => async (dispatch) => {
  try {
    const data = await axios.get("http://localhost:5000/notification/getNotes");
    
    console.log(data.data);
    dispatch({ type: "FETCHNOTES", payload: [...data] });
  } catch (error) {
    console.log(error);
  }
};

export const notesReaded = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("profile")).token;
  try {
    const data = await axios.patch(
      "http://localhost:5000/notification/updateNotes",
      "",
      {
        headers: { authorization: token },
      }
    );
    console.log(data);
    // dispatch({ type: "FETCHNOTES", payload: [...data] });
  } catch (error) {
    console.log(error);
  }
};
