import React from "react";
import Grid from "@mui/material/Grid";
import Post from "./PostCard";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

function Posts({ handelChange1 }) {
  const handelChange = (post) => {
    handelChange1(post);
  };

  const posts = useSelector((state) => state.posts);

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"flex-start"}
      gap={"30px"}
      position={"relative"}
    >
      {!posts?.length ? (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        posts?.map((post) => {
          return (
            <Post post={post} key={post._id} handelChange={handelChange} />
          );
        })
      )}
    </Grid>
  );
}

export default Posts;
