"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputLogin = exports.CreateUserInput = exports.UserModal = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function findByEmail(email) {
    return this.findOne({ email });
}
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true, minlength: 4, maxlength: 8 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', async function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }),
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.QueryMethod)(findByEmail),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
const UserModal = (0, typegoose_1.getModelForClass)(User);
exports.UserModal = UserModal;
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let InputLogin = class InputLogin {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], InputLogin.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], InputLogin.prototype, "password", void 0);
InputLogin = __decorate([
    (0, type_graphql_1.InputType)()
], InputLogin);
exports.InputLogin = InputLogin;
