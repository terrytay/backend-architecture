import path from "path";
import {config} from "dotenv";
import {exit} from "shelljs";
import {initApp} from "./server";

loadConfig();

try {
  //TODO: Initialize dbClient here
  //TODO: Initialize app upon promise resolve of dbClient initialization

  initApp();

} catch (error) {
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
