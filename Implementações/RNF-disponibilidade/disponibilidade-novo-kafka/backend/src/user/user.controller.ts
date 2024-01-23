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
import { ProductService } from "../kafka/producer.service";
////////////////////////////////////////////////////////////////////////////////

@UseInterceptors(ClassSerializerInterceptor)
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly producerService: ProductService,
    ) {}

  /** --- CRUD ---------------------------------------------------------------*/
  @AllowAnon()
  @Get()
  async findAll(){
    await this.producerService.produce({
      topic: 'users',
      messages: [
        {
          key: "users",
          value: this.userService.findOne("id", 1).toString(),
  
        },
      ],
    });
  }

  /** --- custom endpoints -----------------------------------------------------*/
  @Get("profile")
  profile(@Req() req: PassportRequest): Promise<User> {
    return this.userService.profile(req.user!.id);
  }
}
