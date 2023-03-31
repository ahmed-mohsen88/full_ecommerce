import jwt from "jsonwebtoken";
import users from "../models/users.js";

const auth = async (req, res, next) => {
  console.log("auth");
  try {
    const token = await req.headers.authorization;
    console.log(token);
    const isCustomAuth = (await token.length) < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      console.log(decodedData);
      req.userId = await decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    if (req.body.email) {
      next();
    } else {
      const email = await decodedData.email;
      const existingUser = await users.findOne({ email });
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test",
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        result: {
          email: existingUser.email,
          name: existingUser.name,
          id: existingUser._id,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "invalid token" });
  }
};

export default auth;
