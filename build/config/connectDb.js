"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const connectDB = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then((res) => {
        console.log(colors_1.default.bgMagenta.white.bold(`the db is connected in: ${res.connection.port}`));
    })
        .catch((err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.default = connectDB;
