"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authChecker = ({ root, args, context, info }) => {
    return !!context.user;
};
exports.default = authChecker;
