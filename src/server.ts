import App from "./app";
import Controller from "controller.interface";
import {HealthController} from "./controllers/health";

interface IRepositories {

}

interface IServices {

}

function getRepositories(): IRepositories {
  return {
    
  };
}

function getServices(repos: IRepositories): IServices {
  return {
    
  };
}

function getControllers(services: IServices): Controller[] {
  return [
    new HealthController()
  ];
}

export function initApp(): void {
  //TODO: DB later
  const repositories = getRepositories();
  const services = getServices(repositories);
  const controllers = getControllers(services);

  const app = new App(controllers);

  // Entry point
  const port = process.env.PORT || "3000";
  app.start(port);
}
