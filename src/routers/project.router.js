import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  handleCreateProject,
  handleGetAllProjects,
  handleGetProjectById,
} from "../controllers/projectController.js";

const projectRouter = express();

projectRouter.post("/", asyncHandler(handleCreateProject));
projectRouter.get("/", asyncHandler(handleGetAllProjects));
projectRouter.get("/:projectId", handleGetProjectById);

export default projectRouter;
