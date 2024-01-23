import { Request, Response } from "express";
import { userService } from "../service/user.service";
import { TUser } from "../types/user";

class UserController {

    async registerUser(req: Request, res: Response) {
        const { email, name, password }: TUser = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Verificação de email válido usando expressão regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const nameRegex = /[<>]/; // Expressão regular para detectar caracteres "<" e ">"
        if (nameRegex.test(name)) {
          return res.status(400).json({ message: "Invalid characters in name field" });
        }

        const result = await userService.create({ email, name, password });

        if (result.code === 201) {
            return res.status(result.code).json(result.result)
        }


        return res.status(result.code).json(result.msg)
    }

    async getAllUser(req: Request, res: Response) {
        const result = await userService.getAll()

        if (result.code === 500) {
            return res.status(result.code).json(result.msg)
        }

        return res.status(result.code).json(result.result)
    }
}


export default UserController