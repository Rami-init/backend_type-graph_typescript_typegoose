"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const user_schema_1 = require("../schema/user.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_utils_1 = require("../utils/jwt.utils");
class UserServices {
    async createUser(input) {
        const user = await user_schema_1.UserModal.create(input);
        return user;
    }
    async loginUser(input, context) {
        let msg = 'Invalid email or password';
        // find user
        const user = await user_schema_1.UserModal.find().findByEmail(input.email).lean();
        if (!user)
            throw new apollo_server_core_1.ApolloError(msg);
        // check the password
        const passwordValid = await bcryptjs_1.default.compare(input.password, user.password);
        if (!passwordValid)
            throw new apollo_server_core_1.ApolloError(msg);
        // sign jwt
        const token = await (0, jwt_utils_1.signJwt)(user);
        if (!token)
            throw new apollo_server_core_1.ApolloError(msg);
        // sign cookies
        let maxAge = 1000 * 60 * 60 * 24 * 265;
        context.res.cookie("acessToken", token, {
            maxAge,
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            // secure: process.env.NODE_ENV === "production", 
        });
        return token;
    }
}
exports.default = UserServices;
