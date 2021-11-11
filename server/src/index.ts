import "reflect-metadata";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { PostResolver } from "./resolvers/post";
import config from "../ormconfig";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection(config);

  const app = express();
  app.use(
    cors({
      origin: ["https://studio.apollographql.com"],
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    // context is object accessible by all resolvers
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`server started on localhost:4000`);
  });
};

main().catch((err) => console.error(err));
