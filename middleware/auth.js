import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //this checks if the token is our own or google's

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); // test is the same secret used in the users controller

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; //sub is google's name for a specific id that differentiates between users
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
