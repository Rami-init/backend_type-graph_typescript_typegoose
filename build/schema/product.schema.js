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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProduct = exports.CreateProductInput = exports.Product = exports.ProductModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
let Product = class Product {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], Product.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "inStock", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    (0, typegoose_1.prop)({ required: true, ref: user_schema_1.User }),
    __metadata("design:type", Object)
], Product.prototype, "user", void 0);
Product = __decorate([
    (0, type_graphql_1.ObjectType)()
], Product);
exports.Product = Product;
const ProductModel = (0, typegoose_1.getModelForClass)(Product);
exports.ProductModel = ProductModel;
let CreateProductInput = class CreateProductInput {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "inStock", void 0);
__decorate([
    (0, type_graphql_1.Field)(_ => Number),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "rating", void 0);
CreateProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
let GetProduct = class GetProduct {
};
__decorate([
    (0, type_graphql_1.Field)(_ => String),
    __metadata("design:type", String)
], GetProduct.prototype, "_id", void 0);
GetProduct = __decorate([
    (0, type_graphql_1.InputType)()
], GetProduct);
exports.GetProduct = GetProduct;
