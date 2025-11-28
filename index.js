import express from "express";
import appConfig from "./app.config.js";
import authRouter from "./src/routers/auth.router.js";
import projectRouter from "./src/routers/project.router.js";
import errorHandler from "./src/middleware/errorHandler.js";
import verifyToken from "./src/middleware/verifyAuth.js";

import cors from "cors";

const app = express();

// middlewares
app.use(cors("*"));
app.use(express.json());

// routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/projects", verifyToken, projectRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
