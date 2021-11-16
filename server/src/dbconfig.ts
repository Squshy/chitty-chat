import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";
import path from "path";

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  logging: !__prod__,
  username: "postgres",
  password: "postgres",
  database: "chittychat",
  synchronize: true,
  entities: [path.join(__dirname, "./entities/*")],
  migrations: [path.join(__dirname, "./migrations/*")]
};

export = config;
