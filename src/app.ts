import express, {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import {loggingMiddleware} from "./middleware/logging";
import Controller from "controller.interface";
import logger from "./util/logger";

class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    // Initialize express app
    this.app = express();

    this.app.get("/", function(request: Request, response: Response, next: NextFunction) {
      response.sendStatus(StatusCodes.OK);
    });

    this.initializeMiddlewares();

    this.initializeControllers(controllers);
  }

  public start(port: string): void {
    this.app.listen(port, () => {
      logger.info(`Process ENV: ${process.env.NODE_ENV}`);
      logger.info(`App listening on the port: ${port}`);
    });
  }

  public getApplication(): express.Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());

    // default error handling middleware (part of express) for full stack trace
    if (process.env.NODE_ENV === "dev") {
      this.app.use(errorHandler());
    }

    // custom middleware to log accessed routes with response times and response codes
    this.app.use(loggingMiddleware);

    // TODO: evaluate these middlewares and see what we need for this project
    // this.app.use(compression());
    // this.app.use(bodyParser.urlencoded({extended: true}));
    // this.app.use(lusca.xframe("SAMEORIGIN"));
    // this.app.use(lusca.xssProtection(true));
  }

  private initializeControllers(controllers: Controller[]) {
    if (controllers == null) {
      return;
    }

    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default App;
