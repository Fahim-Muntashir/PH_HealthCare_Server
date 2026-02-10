import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("error from global error handler", err);
  }

  let errorSources: TErrorSources[] = [];

  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let messsage: string = "internal server error";
  let stack: string | undefined = undefined;
  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode as number;
    messsage = simplifiedError.messsage;
    errorSources = [...simplifiedError.errorSources];
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    messsage: err.message;
    stack: err.stack;
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: messsage,
    errorSources: err.message,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    error: envVars.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json({ errorResponse });
};
