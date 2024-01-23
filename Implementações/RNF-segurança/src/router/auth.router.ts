import { Router } from "express";
import AuthController from "../controller/auth.controller";

const routerAuth = Router()
const authController = new AuthController()

routerAuth.post("/",authController.login)

export default routerAuth