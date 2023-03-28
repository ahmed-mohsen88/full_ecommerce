import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, TextField, Button, Paper, Stack, Box, } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { UpdatePost, createPost, getPosts } from "../../redux/actions/posts";
function Form({ editState, seteditState }) {
  const creatorId = JSON.parse(localStorage.getItem("profile")).result.id;
  const [postData, setpostData] = useState({ title: "", message: "", tags: "", selectedFile: "", creatorId: creatorId, });

  const x = useCallback(() => {
    setpostData(editState);
  }, [editState]);
  useEffect(() => {
    if (editState) x();
  }, [editState, x]);

  const dispatch = useDispatch();
  const handelFormChange = (event, id) => {
    const inputValue = event.target.value;
    setpostData({ ...postData, [id]: inputValue });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("profile")).token;
    const creator = JSON.parse(localStorage.getItem("profile")).result.name;
    const updatedData = { ...postData, creator: creator };
    if (!editState) {
      dispatch(createPost(updatedData, token));
    } else {
      dispatch(UpdatePost(editState._id, updatedData, token));
      seteditState("");
    }
    clear();
    dispatch(getPosts());
  };
  const clear = () => {
    setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      creatorId: creatorId,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
      <Paper sx={{ borderRadius: "9px", boxShadow: "0 0 2px 2px" }}>
        <FormControl sx={{ padding: "10px", width: "100%" }}>
          <Stack gap={2}>
            <FormLabel
              sx={{
                alignSelf: "center",
                fontSize: "2rem",
                marginBottom: "10px",
              }}
            >
              Create New Memory
            </FormLabel>

            <TextField
              id="title"
              label="Title"
              value={postData.title}
              onChange={(event) => handelFormChange(event, event.target.id)}
            />
            <TextField
              id="message"
              label="Message"
              type="text"
              multiline
              rows={7}
              value={postData.message}
              onChange={(event) => handelFormChange(event, event.target.id)}
            />

            <TextField
              id="tags"
              label="Tags"
              value={postData.tags}
              onChange={(event) => handelFormChange(event, event.target.id)}
            />

            <FileBase
              type="file"
              style={{
                backgroundColor: "white",
                color: "white",
              }}
              // multiple={false}
              onDone={(base64) => {
                setpostData({ ...postData, selectedFile: base64 });
              }}
            />
            <Box
              color="primary"
              sx={{
                gap: "10px",
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <Button onClick={(e) => handelSubmit(e)} variant="contained">
                Submit
              </Button>
              <Button color="error" variant="contained" onClick={clear}>
                Clear
              </Button>
            </Box>
          </Stack>
        </FormControl>
      </Paper>
    </Container>
  );
}

export default Form;
