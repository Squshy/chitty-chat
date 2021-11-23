import "reflect-metadata";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import "dotenv-safe/config";
import config from "./dbconfig";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "./redisClient";
import { MyContext } from "./types";
import path from "path";
import { User } from "./entities/User";
import { Friend } from "./entities/Friend";
import { FriendResolver } from "./resolvers/friend";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "chittychat",
    username: "postgres",
    password: "postgres",
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Friend],
  });
  // await conn.runMigrations();

  const app = express();
  let RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  app.set("trust proxy", !__prod__);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 364 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // none is needed for apollographql sandbox
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "def make this a .env thing later",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, FriendResolver],
      validate: false,
    }),
    // context is object accessible by all resolvers
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`server started on localhost:4000`);
  });
};

main().catch((err) => console.error(err));
