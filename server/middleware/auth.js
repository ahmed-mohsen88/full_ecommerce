import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log("auth");
  try {
    const token = req.headers.authorization;
    console.log(token);
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      console.log(decodedData);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "invalid token" });
  }
};

export default auth;
