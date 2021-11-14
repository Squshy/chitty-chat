import "reflect-metadata";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { PostResolver } from "./resolvers/post";
import config from "../ormconfig";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import redisClient from "./redisClient";
import { MyContext } from "./types";

const main = async () => {
  const conn = await createConnection(config);

  const app = express();
  let RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", 'http://localhost:3000'],
      credentials: true,
    })
  );

  app.set("trust proxy", !__prod__);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 364 * 10, // 10 years
        httpOnly: true,
        sameSite: __prod__ ? 'lax' : 'none', // none is needed for apollographql sandbox
        secure: true, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "def make this a .env thing later",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    // context is object accessible by all resolvers
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(4000, () => {
    console.log(`server started on localhost:4000`);
  });
};

main().catch((err) => console.error(err));
