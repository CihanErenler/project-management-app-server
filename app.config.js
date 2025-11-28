import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  pgConnectionString: process.env.PG_URL,
};

export default appConfig;
