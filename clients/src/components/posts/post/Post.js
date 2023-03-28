import {
  Card,
  Grid,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { DeletedPost, UpdatePost } from "../../../redux/actions/posts";
import { useNavigate } from "react-router-dom";
import { setSelectedPost } from "../../../redux/actions/selectedPost";

function Post({ post, handelChange }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelLiked = (post) => {
    const updatedCount = {
      ...post,
    };
    const token = JSON.parse(localStorage.getItem("profile")).token;
    dispatch(UpdatePost(post._id, updatedCount, token));
  };
  const handelDelete = (post) => {
    const token = JSON.parse(localStorage.getItem("profile")).token;
    dispatch(DeletedPost(post._id, token));
  };

  const hendelUpdate = (post) => {
    handelChange(post);
  };
  const handelDetails = (post) => {
    dispatch(setSelectedPost(post));
    navigate(`/details/${post._id}`);
  };
  return (
    <>
      {
        <Grid
          item
          md={3}
          key={post._id}
          sx={{
            borderRadius: "9px",
          }}
        >
          <Card
            sx={{
              borderRadius: "9px",
              padding: "10px",
              gap: "10px",
            }}
          >
            <CardHeader
              avatar={<Avatar aria-label=""></Avatar>}
              action={<IconButton aria-label=""></IconButton>}
              title={post?.creator}
              subheader={`${moment(post?.createdAt).fromNow()}`}
            />

            <CardMedia
              title={post?.title}
              color="white"
              component={"img"}
              image={post?.selectedFile?.base64}
              alt="profile"
              sx={{
                zIndex: "-1",
                width: "100%",
                objectFit: "cover",
                height: "250px",
                cursor: "pointer",
              }}
              onClick={() => handelDetails(post)}
            />
            <CardContent>
              <Typography>{post?.tags}</Typography>
              <Typography>{post?.message}</Typography>
            </CardContent>
            <Box
              variant="text"
              color="primary"
              aria-label=""
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                onClick={() => {
                  handelLiked(post);
                }}
              >
                {"Liked "} {post.likeCount}
              </Button>
              {post.creatorId ===
              JSON.parse(localStorage.getItem("profile")).result.id ? (
                <>
                  <Button onClick={() => hendelUpdate(post)}>Update</Button>
                  <Button onClick={() => handelDelete(post)}>Delete</Button>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Card>
        </Grid>
      }
    </>
  );
}
export default Post;
