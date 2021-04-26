import {NextFunction, Request, Response} from "express";
import logger from "../util/logger";

/*
Logs accessed routes with response times and response codes
 */
export function loggingMiddleware(request: Request, response: Response, next: NextFunction): void {
  const method = request.method;
  const url = request.url;
  const formattedDate = new Date(Date.now());

  response.on("finish", () => {

    const status = response.statusCode;
    const requestDuration = getRequestDurationInMilliseconds(process.hrtime());
    const logMessage = `[${formattedDate}] ${method}:${url} ${status} ${requestDuration.toLocaleString()} ms`;

    logger.info(logMessage);
  });

  next();
}

function getRequestDurationInMilliseconds(startTime: [number, number]): number {
  const S_TO_NS = 1e9; // convert from seconds to nanoseconds
  const NS_TO_MS = 1e-6; // convert from nanoseconds to milliseconds

  const diff = process.hrtime(startTime); // elapsed time: [seconds, nanoseconds]
  return (diff[0] * S_TO_NS + diff[1]) * NS_TO_MS;
}
