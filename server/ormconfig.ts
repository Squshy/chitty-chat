import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./src/constants";
import path from "path";

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  logging: !__prod__,
  username: "postgres",
  password: "postgres",
  database: "chittychat",
  entities: [path.join(__dirname, "src/entities/*.js")],
  migrations: [path.join(__dirname, "src/migrations/*.js")],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
};

export = config;
