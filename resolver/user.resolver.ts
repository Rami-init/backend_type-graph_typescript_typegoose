import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { CreateUserInput, User, InputLogin } from '../schema/user.schema'
import UserServices from '../service/user.service'
import { Context } from '../types.td'

@Resolver()
class UserResolver{
    constructor(private userService: UserServices) {
        this.userService = new UserServices()
    }
    @Mutation(()=> User)
    createUser(@Arg('input') input: CreateUserInput) {
        return this.userService.createUser(input)
    }
    @Mutation(()=> String)
    login(@Arg('input') input: InputLogin, @Ctx() context: Context){
        return this.userService.loginUser(input, context)
    }
    @Query(()=> User, {nullable: true})
    me(@Ctx() context: Context) {
        return context.user
    }
}
export default UserResolver