"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign({ ...object }, process.env.SECRET_JWT, {
        ...(options && options),
    });
}
exports.signJwt = signJwt;
async function verfiyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        return decoded;
    }
    catch (err) {
        return null;
    }
}
exports.verfiyJwt = verfiyJwt;
