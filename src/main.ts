import path from "path";
import {config} from "dotenv";
import {exit} from "shelljs";
import {initApp} from "./server";
import logger from "./util/logger";

loadConfig();

try {
  //TODO: Initialize dbClient here
  //TODO: Initialize app upon promise resolve of dbClient initialization

  initApp();

} catch (e) {
  logger.error("failed to connect to db: ", e);
  process.exit(1);
}


/*
  Loads the proper environment file for running.
  e.g. if NODE_ENV=dev, .env.dev will be loaded.
 */
function loadConfig() {
  const NODE_ENV = process.env.NODE_ENV || "dev";
  const envFilePath = __dirname + path.sep + ".env." + NODE_ENV;

  const loadConfigResult = config({path: envFilePath});

  if (loadConfigResult != null && loadConfigResult.error != null) {
    exit(1);
  }
}
