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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const product_schema_1 = require("../schema/product.schema");
const product_service_1 = __importDefault(require("../service/product.service"));
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
        this.productService = new product_service_1.default();
    }
    createProudct(input, context) {
        const user = context.user;
        return this.productService.createProduct({ ...input, user: user === null || user === void 0 ? void 0 : user._id });
    }
    getProduct(input) {
        return this.productService.getProduct(input);
    }
    getProducts() {
        return this.productService.getProducts();
    }
};
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => product_schema_1.Product),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_schema_1.CreateProductInput, Object]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "createProudct", null);
__decorate([
    (0, type_graphql_1.Query)(() => product_schema_1.Product),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_schema_1.GetProduct]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "getProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => [product_schema_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "getProducts", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [product_service_1.default])
], ProductResolver);
exports.default = ProductResolver;
