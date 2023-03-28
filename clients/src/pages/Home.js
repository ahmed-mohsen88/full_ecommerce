import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import Form from "../components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, searchPosts } from "../redux/actions/posts";
import Search from "../components/Search";

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

  const [searchValue, setSearchValue] = useState("");
  const posts = useSelector((state) => state.posts);

  const handelSearch = (e) => {
    const updatedSearchValue = e.target.value;
    setSearchValue(() => updatedSearchValue);
    const filteredPosts = posts.filter((post) => {
      return post.creator.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (updatedSearchValue === "") {
      dispatch(getPosts());
    } else {
      dispatch(searchPosts(filteredPosts));
    }
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
            <Search handelSearch={handelSearch} searchValue={searchValue} />
            <Form editState={editState} seteditState={seteditState} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
