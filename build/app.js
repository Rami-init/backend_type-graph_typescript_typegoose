"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const jwt_utils_1 = require("./utils/jwt.utils");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = require("./resolver/index");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authChecker_1 = __importDefault(require("./utils/authChecker"));
dotenv_1.default.config();
async function bootstrap() {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    (0, connectDb_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: index_1.resolvers,
        authChecker: authChecker_1.default
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: (ctx) => {
            // console.log(ctx.req.cookies.acessToken)
            if (ctx.req.cookies.acessToken) {
                (0, jwt_utils_1.verfiyJwt)(ctx.req.cookies.acessToken)
                    .then((data) => {
                    ctx.user = data;
                })
                    .catch((e) => console.log("error jwt"));
            }
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === "production"
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)(),
        ],
    });
    await server.start();
    server.applyMiddleware({ app, cors: {
            origin: ['https://studio.apollographql.com', 'http://localhost:4000'],
            credentials: true
        } });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(colors_1.default.bgGreen.white.underline.bold(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
    });
}
bootstrap();
