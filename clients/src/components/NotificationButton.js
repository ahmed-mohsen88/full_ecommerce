import { Badge, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { notesReaded } from "../redux/actions/notificationAction";

function NotificationButton({ setshow, show }) {
  const [notificationCount, setnotificationCount] = useState(0);
  const handelNotificationClick = () => {
    setshow(!show);
    dispatch(notesReaded());
  };
  const notes = useSelector((notes) => notes.notificationReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("profile")).result.id;
    const unSeenNotes = notes.filter((note) => {
      return String(note.userSeen) !== String(userId);
    });
    console.log("notButtin");
    setnotificationCount(unSeenNotes.length);
  }, [dispatch, notes]);
  return (
    <>
      <Button onClick={handelNotificationClick}>
        <Badge badgeContent={notificationCount} color="primary">
          <NotificationsIcon color="action" />
        </Badge>
      </Button>
    </>
  );
}

export default NotificationButton;
