import App from "./app";
import Controller from "controller.interface";
import {HealthController} from "./controllers/health";
import {IDBClient} from "./db/client";
import {IUserRepository, UserRepository} from "./repositories/user";
import {IUserService, UserService} from "./services/user";
import {UserController} from "./controllers/user";

interface IRepositories {
  userRepository: IUserRepository
}

interface IServices {
  userService: IUserService
}

function getRepositories(dbClient: IDBClient): IRepositories {
  return {
    userRepository: new UserRepository(dbClient)
  };
}

function getServices(repos: IRepositories): IServices {
  return {
    userService: new UserService(repos.userRepository)
  };
}

function getControllers(services: IServices): Controller[] {
  return [
    new HealthController(),
    new UserController(services.userService)
  ];
}

export function initApp(dbClient: IDBClient): void {
  //TODO: DB later
  const repositories = getRepositories(dbClient);
  const services = getServices(repositories);
  const controllers = getControllers(services);

  const app = new App(controllers);

  // Entry point
  const port = process.env.PORT || "3000";
  app.start(port);
}
