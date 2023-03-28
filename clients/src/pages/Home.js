import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import Form from "../components/form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/posts";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.stringify(localStorage.getItem("profile")).token;
    dispatch(getPosts(token));
  }, [dispatch]);

  const [editState, seteditState] = useState("");
  const handelChange1 = (post) => {
    seteditState(post);
    return post;
  };
  return (
    <Grow in>
      <Container style={{ maxWidth: "100%" }}>
        <Grid
          container
          justifyContent={"center"}
          alignContent="stretch"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <Grid xs={12} sm={9} item display={"flex"}>
            <Posts handelChange1={handelChange1} />
          </Grid>
          <Grid xs={12} sm={3} item>
            <Form editState={editState} seteditState={seteditState} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
