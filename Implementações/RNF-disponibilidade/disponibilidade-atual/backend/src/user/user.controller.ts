/** nestjs */
import {
  Get,
  Req,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";

/** providers */
import { UserService } from "./user.service";

/** entities */
import { User } from "./entities/user.entity";

/** utils */
import { PassportRequest } from "../utils/api-types.utils";
import { AllowAnon } from "../auth/guards/allow-anon.guard";
////////////////////////////////////////////////////////////////////////////////

@UseInterceptors(ClassSerializerInterceptor)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** --- CRUD ---------------------------------------------------------------*/
  @AllowAnon()
  @Get()
  findAll(): Promise<User | null> {
    return this.userService.findOne("id", 1);
  }

  /** --- custom endpoints -----------------------------------------------------*/
  @Get("profile")
  profile(@Req() req: PassportRequest): Promise<User> {
    return this.userService.profile(req.user!.id);
  }
}
