import {Connection, createConnection} from "typeorm";
import {DBConfig} from "./config";

export interface IDBClient {
  initialise(): Promise<void>
  getConnection(): Connection
}

export class DBClient implements IDBClient {
  private connection: Connection
  private connectionConfig: any

  constructor(config: DBConfig) {
    this.connectionConfig = {
      type: config.dbType,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [
        config.entities
      ],
      synchronize: false
    };
  }

  public async initialise(): Promise<void> {
    if (this.connectionConfig == null) {
      return Promise.reject(new Error("no config defined for database connection"));
    }

    await createConnection(this.connectionConfig).then(connection => {
      this.connection = connection;
      this.connectionConfig = null;

    }).catch(error => {
      this.connectionConfig = null;

      // Propogate the error upstream
      return Promise.reject(error);
    });

  }

  public getConnection(): Connection {
    return this.connection;
  }
}
