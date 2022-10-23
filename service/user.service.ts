import { ApolloError } from "apollo-server-core"
import { CreateUserInput, UserModal, InputLogin } from "../schema/user.schema"
import { Context } from "../types.td"
import bcrypt from 'bcryptjs'
import { signJwt } from "../utils/jwt.utils"
class UserServices {
    async createUser(input: CreateUserInput) {
       const  user = await UserModal.create(input)
       return user
    }
    async loginUser(input: InputLogin, context: Context) {
        let msg = 'Invalid email or password'

        // find user
        const user = await UserModal.find().findByEmail(input.email).lean()
        if(!user) throw new ApolloError(msg)

        // check the password
        const passwordValid = await bcrypt.compare(input.password, user.password)
        if(!passwordValid) throw new ApolloError(msg)

        // sign jwt
        const token =await signJwt(user)
        if(!token) throw new ApolloError(msg)
        
        // sign cookies
        let maxAge = 1000 * 60 * 60 * 24 * 265 
        context.res.cookie("acessToken", token, {
            maxAge,
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            // secure: process.env.NODE_ENV === "production", 
        })
       return token
    }
}

export default UserServices