"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const product_schema_1 = require("../schema/product.schema");
class ProductServices {
    // create Product
    async createProduct(input) {
        try {
            const product = await product_schema_1.ProductModel.create(input);
            return product;
        }
        catch (err) {
            throw new apollo_server_express_1.ApolloError(err);
        }
    }
    // get Products
    async getProducts() {
        try {
            const products = await product_schema_1.ProductModel.find();
            return products;
        }
        catch (err) {
            throw new apollo_server_express_1.ApolloError(err);
        }
    }
    // get Product
    async getProduct(input) {
        try {
            const product = await product_schema_1.ProductModel.findById(input);
            return product;
        }
        catch (err) {
            throw new apollo_server_express_1.ApolloError(err);
        }
    }
}
exports.default = ProductServices;
