import { userModel } from "../model/user.model"
import { TUser } from "../types/user"



class UserService {
    async create(UserInfo: TUser) {
        try {

            const user = await userModel.findUserByEmail(UserInfo.email)

            if (user) {
                throw new Error("Usuário já está cadastrado")
            }

            const result = await userModel.createUser(UserInfo)
            return { code: 201, result }
        } catch (err: Error | any) {

            if (err.message === "Usuário já está cadastrado") {
                return { code: 400, msg: err.message }
            }

            return { code: 500, msg: err.message }

        }
    }

    async getAll() {
        try {

            const result = await userModel.findAll()
            return { code: 200, result }

        } catch (err:any) {
            return { code: 500, msg: err.message }
        }
    }
}

export const userService = new UserService()