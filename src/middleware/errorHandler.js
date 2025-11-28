import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const baseMessage =
    err.message || "Something went wrong, please try again later.";

  const responseBody = { message: baseMessage };

  if (err.details) {
    responseBody.details = err.details;
  }

  if (process.env.NODE_ENV !== "production") {
    responseBody.stack = err.stack;
  }

  console.error(err); // surface full error in logs for troubleshooting

  return res.status(statusCode).json(responseBody);
};

export default errorHandler;
