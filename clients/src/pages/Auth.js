import React, { useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendData, signIN } from "../redux/actions/signUp";
import Input from "../components/Input";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handelSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("profile", JSON.stringify(inputValue));
    dispatch(sendData(inputValue, navigate));
    // dispatch(signIN(inputValue, navigate));
  };
  const handelSignIN = (event) => {
    event.preventDefault();
    localStorage.setItem("profile", JSON.stringify(inputValue));
    dispatch(signIN(inputValue, navigate));
  };
  const [show, setShow] = useState(false);
  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const sucessHandler = (response) => {
    const token = response.credential;
    dispatch(sendData(token));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: "30px",
      }}
    >
      {isSignUp ? (
        <FormControl component="form" onSubmit={(e) => handelSignIN(e)}>
          <Paper
            sx={{
              boxShadow: "0 0 2px 2px",
              borderRadius: "9px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <FormLabel component="legend" sx={{ fontSize: "2rem" }}>
              Sign In
            </FormLabel>
            <Input
              label="Email"
              name="email"
              type={"text"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <Input
              label="password"
              name="password"
              type={show ? "text" : "password"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              handleClickShowPassword={handleClickShowPassword}
            />
            <Grid container spacing={0}>
              <Button
                variant="contained"
                color="primary"
                // onClick={handelSignIN}
                type="submit"
              >
                Sign IN
              </Button>
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
            <Grid container>
              <Link onClick={() => setIsSignUp(!isSignUp)}>
                Don't Have Account ! Sign UP{" "}
              </Link>
            </Grid>
          </Paper>
        </FormControl>
      ) : (
        <FormControl component="form" onSubmit={handelSubmit}>
          <Paper
            sx={{
              boxShadow: "0 0 2px 2px",
              borderRadius: "9px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <FormLabel component="legend" sx={{ fontSize: "2rem" }}>
              Sign Up
            </FormLabel>
            <Input
              label="First Name"
              name="firstName"
              type={"text"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <Input
              label="Last Name"
              name="lastName"
              type={"text"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <Input
              label="Email"
              name="email"
              type={"text"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <Input
              label="password"
              name="password"
              type={show ? "text" : "password"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              handleClickShowPassword={handleClickShowPassword}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={show ? "text" : "password"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              handleClickShowPassword={handleClickShowPassword}
            />
            <Button
              variant="contained"
              color="primary"
              //  onClick={handelSubmit}
              type="submit"
            >
              Sign Up
            </Button>
            <Grid container>
              <Link onClick={() => setIsSignUp(!isSignUp)}>
                Already Have Account! Sign IN{" "}
              </Link>
            </Grid>
          </Paper>
        </FormControl>
      )}
    </Container>
  );
}

export default Auth;
