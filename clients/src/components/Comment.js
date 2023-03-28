import { Paper, Typography } from "@mui/material";
import React from "react";

function Comment({ selectedPost }) {
  return (
    <>
      {selectedPost.comments?.map((comment) => {
        return (
          <Paper
            key={Math.random(Math.floor(0.8 * 100))}
            sx={{
              padding: "10px",
              backgroundColor: "rgba(100, 100, 100, 0.2)",
              borderRadius: "9px",
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              gap: "5px",
              margin: "10px",
            }}
          >
            <Typography fontWeight={"600"}>{comment.user}</Typography>
            <Typography component={"p"} key={comment} sx={{ padding: "5px" }}>
              {comment.comment}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
}

export default Comment;
