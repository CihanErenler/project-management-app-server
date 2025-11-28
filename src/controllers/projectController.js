import pool from "../db/db.js";
import { StatusCodes } from "http-status-codes";
import QUERIES from "../utils/dbQueries.js";

export const handleGetAllProjects = async (req, res) => {
  const user = req.user;

  const getProjectsQuert = "SELECT * FROM projects WHERE userId=$1";
  const result = await pool.query(getProjectsQuert, [user.id]);
  res.status(StatusCodes.OK).json(result.rows);
};

export const handleCreateProject = async (req, res) => {
  const { title, description, prefix, userId, status, priority, color } =
    req.body.project;

  await pool.query(QUERIES.project.createProject, [
    title,
    description,
    prefix,
    userId,
    status,
    priority,
    color,
  ]);

  res.status(StatusCodes.CREATED).json({ message: "Project has been created" });
};

export const handleGetProjectById = (req, res) => {
  const { projectId } = req.query;
  const user = req.user;

  const result = pool.query(QUERIES.project.getProjectById, [
    projectId,
    user.id,
  ]);

  res.status(StatusCodes.OK).json(result.rows);
};
