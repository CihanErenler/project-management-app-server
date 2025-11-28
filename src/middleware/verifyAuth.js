import { StatusCodes } from "http-status-codes";
import appConfig from "../../app.config.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthenticated" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthenticated" });
  }

  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthenticated" });
  }
};

export default verifyToken;
