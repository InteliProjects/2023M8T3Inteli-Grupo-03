
import { PrismaClient, User } from "@prisma/client"
import { hash } from "bcrypt"
import { TUser } from "../types/user"
const prisma = new PrismaClient()

class UserModel {
    async createUser(userInfo: TUser): Promise<User> {
        userInfo.password = await hash(userInfo.password,8)
        try {
            const result = await prisma.user.create({
                data: userInfo
            })

            return result
        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    }

    async findUserByEmail(email: string) {
        try {
            const result = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            return result
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findAll(){
        try {
            const result = await prisma.user.findMany()
            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}

export const userModel = new UserModel()