import {prop, Ref, getModelForClass} from '@typegoose/typegoose'
import {ObjectType, Field, InputType} from 'type-graphql'
import { User } from './user.schema'

@ObjectType()
class Product {
    @Field(_=> String)
    _id!: string

    @Field(_=> String)
    @prop({required: true})
    title!: string

    @Field(_=> String)
    @prop({required: true})
    description!: string

    @Field(_=> Number)
    @prop({required: true})
    price!: number

    @Field(_=> Number)
    @prop({required: true})
    inStock!: number

    @Field(_=> Number)
    @prop({required: true})
    rating!: number

    @Field(_=> String)
    @prop({required: true, ref: User})
    user!: Ref<User>
}
const ProductModel = getModelForClass<typeof Product>(Product)

@InputType()
class CreateProductInput{
    @Field(_=> String)
    title!: string

    @Field(_=> String)
    description!: string

    @Field(_=> Number)
    price!: number

    @Field(_=> Number)
    inStock!: number

    @Field(_=> Number)
    rating!: number

}

@InputType()
class GetProduct {
    @Field(_=> String)
    _id!: string
}

export { ProductModel, Product, CreateProductInput, GetProduct }
