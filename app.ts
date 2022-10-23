import express from "express";
import colors from "colors";
import connectDB from "./config/connectDb";
import dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { verfiyJwt } from "./utils/jwt.utils";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolver/index";
import cookieParser from "cookie-parser";
import { User } from "./schema/user.schema";
import { Context } from "./types.td";
import authChecker from './utils/authChecker'
dotenv.config();
async function bootstrap(): Promise<void> {
  const app = express();
  app.use(cookieParser());
  connectDB();
  const schema = await buildSchema({
    resolvers,
    authChecker
  });
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
        // console.log(ctx.req.cookies.acessToken)
      if (ctx.req.cookies.acessToken) {
        verfiyJwt<User>(ctx.req.cookies.acessToken)
          .then((data) => {
              ctx.user = data})
              .catch((e) => console.log("error jwt"));
            }
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, cors: {
    origin: ['https://studio.apollographql.com', 'http://localhost:4000'],
    credentials: true
  } });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      colors.bgGreen.white.underline.bold(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    );
  });
}

bootstrap();
