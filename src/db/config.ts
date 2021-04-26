export enum DBType {
  POSTGRES = "postgres"
}

export class DBConfig {
  dbType: DBType
  host: string
  database: string
  port: number
  username: string
  password: string
  entities?: string

  constructor(dbType: DBType, host: string, database: string, port: number, username: string, password: string, entities: string) {
    this.dbType = dbType;
    this.host = host;
    this.database = database;
    this.port = port;
    this.username = username;
    this.password = password;
    this.entities = entities;
  }
}
