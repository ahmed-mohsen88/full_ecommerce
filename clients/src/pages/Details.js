import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedPost,
  setSelectedPost,
} from "../redux/actions/selectedPost";
import { Link, useParams } from "react-router-dom";
import { addComment, resetComment } from "../redux/actions/comments";
import Comment from "../components/Comment";
import ScrollToTop from "../components/ScrollToTop";
function Details() {
  const [comments, setComments] = useState("");

  const selectedPost = useSelector((state) => state.selectedPost);

  const dispatch = useDispatch();

  const params = useParams();

  // useEffect(() => {
  //   dispatch(refreshSelected(params.id));
  // }, [dispatch, params]);

  const handelComments = (e, params, comments) => {
    e.preventDefault();
    const { id } = params;
    const token = JSON.parse(localStorage.getItem("profile")).token;
    const user = JSON.parse(localStorage.getItem("profile")).result.name;
    dispatch(addComment(id, comments, token, user, selectedPost));
    dispatch(setSelectedPost(selectedPost));
    setComments("");
  };

  return (
    <Container maxWidth="lg" style={{ maxWidth: "100%", position: "relative" }}>
      {!selectedPost ? (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <Paper sx={{ padding: "20px", margin: "20px", borderRadius: "9px" }}>
          <Grid
            container
            display={"flex"}
            sx={{ padding: "20px", justifyContent: "space-between" }}
          >
            <Grid item md={5} sx={{ position: "relative" }}>
              <Stack gap={"10px"}>
                <Link
                  to={"/home"}
                  sx={{ position: "absolute", top: "0", left: "0" }}
                  onClick={() => {
                    dispatch(resetSelectedPost());
                    dispatch(resetComment());
                  }}
                >
                  <Button variant="contained" color="primary">
                    Back
                  </Button>
                </Link>
                <Typography
                  component={"h1"}
                  fontSize={"3rem"}
                  fontWeight={"700"}
                  sx={{
                    letterSpacing: "5px",
                  }}
                >
                  {selectedPost?.title}
                </Typography>
                {selectedPost["tags"]?.map((tag) => {
                  return (
                    <Typography component={"p"} key={tag}>
                      #{tag}
                    </Typography>
                  );
                })}
                <Stack sx={{ paddingY: "10px", gap: "10px" }}>
                  <Typography component={"p"} fontSize={"1.5rem"}>
                    {selectedPost?.message}
                  </Typography>
                  <Typography component={"p"} fontSize={"1.5rem"}>
                    {"Created by "} {selectedPost.creator}{" "}
                    {`${moment(selectedPost?.createdAt).fromNow()}`}
                  </Typography>
                </Stack>
              </Stack>
              <Paper
                sx={{
                  borderTop: "2px solid black",
                  padding: "10px",
                }}
              >
                <Stack>
                  <Typography
                    component={"h2"}
                    fontSize={"1.6rem"}
                    fontWeight={"700"}
                  >
                    Comments
                  </Typography>

                  <Comment selectedPost={selectedPost} />

                  <FormControl
                    component={"form"}
                    onSubmit={(e) => handelComments(e, params, comments)}
                  >
                    <TextField
                      type="text"
                      placeholder="Write a comment"
                      fullWidth
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Send
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={5}>
              <Box
                component={"img"}
                height={"50vh"}
                width={"100%"}
                src={selectedPost?.selectedFile?.base64}
                alt={"mainPhoto"}
                sx={{ borderRadius: "20px" }}
              />
            </Grid>
          </Grid>
          {/* scroll to top icon */}
          <ScrollToTop />
        </Paper>
      )}
    </Container>
  );
}

export default Details;
