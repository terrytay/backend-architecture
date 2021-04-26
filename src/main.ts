import path from "path";
import {config} from "dotenv";
import {exit} from "shelljs";
import {initApp} from "./server";
import logger from "./util/logger";
import {DBClient} from "./db/client";
import {DBConfig, DBType} from "./db/config";

loadConfig();

try {
  const dbClient = new DBClient(
    new DBConfig(
      DBType.POSTGRES,
      process.env.DB_HOST,
      process.env.DB_DATABASE,
      +process.env.DB_PORT,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      __dirname + "/entities/*.{js.ts}"
    )
  );
  const result = dbClient.initialise().then(() => {
    logger.info("connection to db established successfully");

    initApp(dbClient);
  }).catch(error => {
    throw error;
  });

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
