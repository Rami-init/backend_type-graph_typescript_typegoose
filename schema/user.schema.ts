import { prop, getModelForClass, pre, ReturnModelType, QueryMethod, index } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql'
import { AsQueryMethod } from '@typegoose/typegoose/lib/types'
import bcrypt from 'bcryptjs'
function findByEmail(this: ReturnModelType<typeof User, QueryHelper>, email: User['email']) {
    return this.findOne({email})
}
interface QueryHelper {
    findByEmail: AsQueryMethod<typeof findByEmail>
}
@pre<User>('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
@index({email: 1})
@QueryMethod(findByEmail)
@ObjectType()
class User {
    @Field(_=> String)
    _id!: string;

    @Field(_=> String)
    @prop({required: true})
    name!: string;

    @Field(_=> String)
    @prop({required: true, unique: true})
    email!: string;

    @Field(_=> String)
    @prop({required: true, minlength: 4, maxlength: 8})
    password!: string;

}
const UserModal = getModelForClass<typeof User, QueryHelper>(User)

@InputType()
class CreateUserInput {
    @Field(_=> String)
    name!: string

    @Field(_=>String)
    email!: string

    @Field(_=>String)
    password!: String
}
@InputType()
class InputLogin {
    @Field(_=> String)
    email!: string
    
    @Field(_=> String)
    password!: string
} 
export { User, UserModal, CreateUserInput,  InputLogin}
