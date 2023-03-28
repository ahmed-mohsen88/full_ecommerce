import { AppBar, Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import memories from "../images/memories.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { signIN } from "../redux/actions/signUp";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.signup);

  const handelLogOut = () => {
    localStorage.clear();
    dispatch({ type: "logout", payload: {} });
  };

  const sucessHandler = (response) => {
    const token = response.credential;
    dispatch(signIN(token));
  };
  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "auto",
        gap: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Grid
        container
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        columnGap={2}
      >
        <Link to="/home">
          <Box component={"img"} alt="memories" src={memories} width={"5vw"} />
        </Link>
        <Typography variant="h3" textAlign={"center"}>
          Memories
        </Typography>
      </Grid>

      <Grid
        container
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        columnGap={2}
      >
        {user.result ? (
          <Grid display={"flex"} alignItems={"center"} gap="10px">
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />
            <Typography color={"info"} fontWeight={"600"}>
              <span style={{ color: "blue" }}>{"Welcome "}</span>
              {user.result.name}
            </Typography>
            <Link to="/" onClick={() => handelLogOut()}>
              <Button variant="contained" color="primary">
                logout
              </Button>
            </Link>
          </Grid>
        ) : (
          <Link to="/">
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        )}

        {/* <GoogleOAuthProvider clientId="1095280240398-lb8og6b9odogs0bd29ldgf4800prbrdb.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={sucessHandler}
            onError={() => {
              console.log("Login Failed");
            }}
            state_cookie_domain="single_host_origin"
          />
        </GoogleOAuthProvider> */}
      </Grid>
    </AppBar>
  );
}

export default NavBar;
