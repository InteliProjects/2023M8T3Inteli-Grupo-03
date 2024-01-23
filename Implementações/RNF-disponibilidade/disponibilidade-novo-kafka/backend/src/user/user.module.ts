/** nestjs */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, Global } from "@nestjs/common";

/** controllers */
import { UserController } from "./user.controller";

/** providers */
import { UserService } from "./user.service";

/** entities */
import { User } from "./entities/user.entity";
import { ProductService } from "../kafka/producer.service";
////////////////////////////////////////////////////////////////////////////////

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService,ProductService ],
  exports: [UserService],
})
export class UserModule {}
