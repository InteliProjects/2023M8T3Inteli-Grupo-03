import { Request, Response } from "express"
import { authService } from "../service/auth.service"
import { TLogin } from "../types/user"

class AuthController {
    async login(req: Request, res: Response) {

        if (!req.body.email || !req.body.password) {
            res.status(401).send("email and pass required")
        }

        const result = await authService.login({ email: req.body.email, password: req.body.password })

        if (result.code === 200) {
            return res.status(200).json({ user: result.infoUser, token: result.token })
        } else {
            return res.status(result.code).json(result.msg)
        }

    }
}

export default AuthController