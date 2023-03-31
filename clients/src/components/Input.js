import React from "react";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Input({
  name,
  label,
  type,
  autoFocus,
  handleClickShowPassword,
  setInputValue,
  inputValue,
}) {
  return (
    <Grid container>
      <TextField
        name={name}
        label={label}
        value={inputValue[`${name}`]}
        onChange={(e) =>
          setInputValue({ ...inputValue, [name]: e.target.value })
        }
        type={type}
        autoFocus={autoFocus}
        fullWidth
        required
        InputProps={
          label === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleClickShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  );
}

export default Input;
