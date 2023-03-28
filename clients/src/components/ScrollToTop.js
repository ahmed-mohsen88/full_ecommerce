import React from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function ScrollToTop() {
  return (
    <Button
      variant="contained"
      sx={{
        position: "fixed",
        bottom: "20%",
        left: "92%",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        animation: "ease 2s",
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <KeyboardDoubleArrowUpIcon />
    </Button>
  );
}

export default ScrollToTop;
