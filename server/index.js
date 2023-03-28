import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import PostRoute from "./Routes/posts.js";
import signUpRouter from "./Routes/signup.js";
import commentsRouter from "./Routes/comments.js";

dotenv.config();

const app = express();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());

app.use("/posts", PostRoute);
app.use("/signup", signUpRouter);
app.use("/comments" ,commentsRouter )

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => app.listen(PORT, () => console.log(`server running + ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
  });

// mongoose.set("useFindAndModify", false);
