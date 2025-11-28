import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import appConfig from "../../app.config.js";
import pool from "../db/db.js";
import QUERIES from "../utils/dbQueries.js";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const result = await pool.query(QUERIES.auth.getUserByEmail, [email]);
  const foundUser = result.rows[0] || null;

  if (!foundUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid credentiols" });
  }

  const isPassCorrect = await bcrypt.compare(password, foundUser?.password);

  if (!isPassCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid credentials" });
  }

  const tokenPayload = { id: foundUser.id, email: foundUser.email };
  const accessToken = jwt.sign(tokenPayload, appConfig.jwtSecret);

  res.status(StatusCodes.OK).json({ accessToken, user: tokenPayload });
};

export const handleRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const result = await pool.query(QUERIES.auth.getUserByEmail, [email]);
  const foundUser = result.rows[0] || null;

  if (foundUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User with this email already exists." });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await pool.query(QUERIES.auth.createUser, [email, hashedPassword]);

  res
    .status(StatusCodes.OK)
    .json({ message: "User has been created successfully" });
};

export const handleCheckAuth = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }

  const verified = jwt.verify(token, appConfig.jwtSecret);
  const { id } = verified;

  if (!verified) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }

  const result = await pool.query(QUERIES.auth.getUserById, [id]);
  const foundUser = result.rows[0] || null;

  if (!foundUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }

  const userToSend = { id: foundUser.id, email: foundUser.email };

  return res.status(StatusCodes.OK).json({ user: userToSend });
};
