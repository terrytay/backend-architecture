import Controller from "controller.interface";
import GenericResponse from "response.interface";
import {NextFunction, Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";
import logger from "../util/logger";

class HealthCheckResponse implements GenericResponse {
  success: boolean;
  message: string;
  timestamp: number;

  constructor(success: boolean, message: string, timestamp: number) {
    this.success = success;
    this.message = message;
    this.timestamp = timestamp;
  }
}

export class HealthController implements Controller {
  public path = "/health";
  public router = Router({strict: true});

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}`, this.get);
  }

  /**
   * @api {get} /health Health check endpoint
   * @apiGroup Root
   * @apiName Health Check Endpoint
   * @apiDescription API status check
   * @apiExample Request Example
   *  curl https://localhost:5000/health
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   *    success: true,
   *    message: 'OK',
   *    timestamp: 12345678
   *  }
   */
  private get = async (request: Request, response: Response, next: NextFunction) => {
    const healthCheck = new HealthCheckResponse(true, "OK", Date.now());

    try {
      response.send(healthCheck);
    } catch (e) {
      HealthController.sendError(e, healthCheck, response);
    }
  }

  private static sendError(e: Error, message: HealthCheckResponse, response: Response) {
    logger.error("error sending health check response: ", e);
    response.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
  }
}
