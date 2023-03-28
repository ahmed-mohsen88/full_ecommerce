import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import posts from "./redux/reducers/posts";
import signup from "./redux/reducers/signUp";
import selectedPost from "./redux/reducers/selectedPost";
import comments from "./redux/reducers/comments";

const store = configureStore({
  reducer: {
    posts: posts,
    signup: signup,
    selectedPost: selectedPost,
    comments: comments,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
