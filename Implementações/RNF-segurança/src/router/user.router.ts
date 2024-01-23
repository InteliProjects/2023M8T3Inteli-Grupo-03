import { Router } from "express";
import UserController from "../controller/user.controller";
import { authenticatedMiddleware } from "../middleware/authentication";

const routerUser = Router()
const userController = new UserController()

routerUser.post("/",userController.registerUser)
routerUser.get("/",authenticatedMiddleware,userController.getAllUser)

export default routerUser