import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import jwt, {VerifyErrors} from "jsonwebtoken";
import logger from "../util/logger";
import GenericResponse from "response.interface";

class AuthResponse implements GenericResponse {
  success: boolean;
  message: string;
  timestamp: number;

  constructor(success: boolean, message: string, timestamp: number) {
    this.success = success;
    this.message = message;
    this.timestamp = timestamp;
  }
}


export function authenticateToken(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    const authResponse = new AuthResponse(false, StatusCodes.UNAUTHORIZED.toLocaleString(), Date.now());
    return response.send(authResponse);
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (error: VerifyErrors, decoded: any) => {

    if (error != null) {
      logger.error("Invalid authentication, jwt verification failed");
      const authResponse = new AuthResponse(false, StatusCodes.FORBIDDEN.toLocaleString(), Date.now());
      return response.send(authResponse);
    }

    // request.user = user;

    next();
  });
}

/*
 Takes in the username and generate an access token
 */
export function generateAccessToken(username: string): string {
  return jwt.sign({username}, process.env.TOKEN_SECRET, {expiresIn: "30s"});
}
