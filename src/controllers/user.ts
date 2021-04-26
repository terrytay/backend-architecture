import GenericResponse from "response.interface";
import {User} from "../entities/user";
import Controller from "controller.interface";
import {NextFunction, Request, Response, Router} from "express";
import {IUserService} from "../services/user";
import {StatusCodes} from "http-status-codes";
import logger from "../util/logger";

class UserResponse implements GenericResponse {
  message: string;
  success: boolean;
  timestamp: number;
  user: User;

  constructor(success: boolean, message: string, timestamp: number, user: User) {
    this.success = success;
    this.message = message;
    this.timestamp = timestamp;
    this.user = user;
  }
}

export class UserController implements Controller {
  path = "/user";
  router = Router();

  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}/:user`, this.get);
  }

  private get = async (request: Request, response: Response, next: NextFunction) => {
    const { username } = request.params;

    let user: User;
    let userResponse: UserResponse;
    try {
      user = await this.userService.getUser(username);
      userResponse = new UserResponse(true, "OK", Date.now(), user);
    } catch (e) {
      userResponse = new UserResponse(false, e.message, Date.now(), null);
      response.send(userResponse);
    }

    try {
      response.send(userResponse);
    } catch (e) {
      UserController.sendError(e, userResponse, response);
    }

  }

  private static sendError(e: Error, message: UserResponse, response: Response) {
    logger.error("error sending user response: ", e);
    message.message = e.message;
    response.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
  }
}
