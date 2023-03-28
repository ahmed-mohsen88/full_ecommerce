import { Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

function Search({ handelSearch, searchValue }) {
  return (
    <Stack
      marginTop={"10px"}
      padding={"20px"}
      margin="5px"
      borderRadius={"9px"}
    >
      <Paper
        sx={{
          borderRadius: "9px",
          boxShadow: "0 0 2px 2px",
          padding: "10px",
        }}
      >
        <Typography fontSize={"1.4rem"} fontWeight={"600"}>
          Search Post
        </Typography>
        <TextField
          placeholder="Search Post"
          fullWidth
          value={searchValue}
          onChange={(e) => {
            handelSearch(e);
          }}
          label="Search"
        />
      </Paper>
    </Stack>
  );
}

export default Search;
