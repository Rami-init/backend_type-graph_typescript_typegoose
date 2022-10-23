import { ApolloError } from "apollo-server-express";
import { ProductModel, Product, CreateProductInput } from "../schema/product.schema";
import { User } from "../schema/user.schema";

class ProductServices{
    // create Product
    async createProduct(input: CreateProductInput & { user: User["_id"] }){
        try {
            const product = await ProductModel.create(input)
            return product
        } catch (err: unknown | any) {
            throw new ApolloError(err)
        }
    }

    // get Products
    async getProducts(){
        try {
            const products = await ProductModel.find()
            return products
        } catch(err: unknown | any) {
            throw new ApolloError(err)
        }
    }

    // get Product
    async getProduct(input: Product["_id"]){
        try {
            const product = await ProductModel.findById(input)
            return product
        } catch(err: unknown | any) {
            throw new ApolloError(err)
        }
    }
}

export default ProductServices