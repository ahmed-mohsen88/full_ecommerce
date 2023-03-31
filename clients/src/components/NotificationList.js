import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const NotificationList = () => {
  const notification = useSelector((notes) => notes.notificationReducer);
  const userId = JSON.parse(localStorage.getItem("profile")).result.id;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        position: "absolute",
        bottom: "100",
        right: "12%",
        zIndex: "2",
        borderRadius: "9px",
        boxShadow: "0 0 1px 0px",
        padding: "5px",
        opacity: "1",
      }}
    >
      {notification.map((notes) => {
        return (
          <Grid
            key={notes.title + Math.random(Math.floor(100 * 0.8))}
            sx={{
              backgroundColor:
                notes?.userSeen === userId ? "white" : "darkgray",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={notes.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notes.creator}
                      {" created new message"}
                      {"...."}
                    </Typography>
                    {notes.message}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Grid>
        );
      })}
    </List>
  );
};

export default NotificationList;
