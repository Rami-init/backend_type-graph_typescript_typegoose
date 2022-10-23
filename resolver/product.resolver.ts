import { Resolver, Mutation, Arg, Ctx, Query, Authorized } from 'type-graphql'
import { CreateProductInput, GetProduct, Product } from '../schema/product.schema';
import ProductServices from '../service/product.service';
import { Context } from '../types.td';

@Resolver()
class ProductResolver {
    constructor(private productService: ProductServices){
        this.productService = new ProductServices()
    }
    @Authorized()
    @Mutation(()=> Product) 
    createProudct(@Arg("input") input: CreateProductInput, @Ctx() context: Context){
        const user = context.user!
        return this.productService.createProduct({...input, user: user?._id})
    }
    @Query(()=> Product)
    getProduct(@Arg("input") input: GetProduct){
        return this.productService.getProduct(input)
    }

    @Query(()=> [Product])
    getProducts() {
        return this.productService.getProducts()
    }
}

export default  ProductResolver