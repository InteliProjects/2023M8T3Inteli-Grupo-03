/** nestjs */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

/** external dependencies */
import { Repository } from "typeorm";

/** entities */
import { User } from "./entities/user.entity";

/** dtos */
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  /** --- basic CRUD methods ---------------------------------------------------*/
  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if email already exists
    if (await this.findOne("email", createUserDto.email)) {
      throw new UnauthorizedException("Email already exists");
    }

    try {
      const user = this.repository.create(createUserDto);

      // save user to database
      await this.repository.save(user);

      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const data = await this.repository
      .createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where("id = :id", { id })
      .execute();

    // check if user was updated
    if (!data.affected) throw new NotFoundException("User not found.");

    return await this.findOne("id", id);
  }

  async findOne(
    key: string,
    value: unknown,
    relations?: string[],
    map?: boolean
  ): Promise<User | null> {
    const queryBuilder = this.repository
      .createQueryBuilder("user")
      .where(`user.${key} = :${key}`, { [key]: value });

    if (relations)
      for (const relation of relations) {
        map
          ? queryBuilder.leftJoinAndSelect(`user.${relation}`, `${relation}`)
          : queryBuilder.loadRelationIdAndMap(
              `${relation}Ref`,
              `user.${relation}`
            );
      }

    return await queryBuilder.getOne();
  }

  /** --- custom methods -------------------------------------------------------*/
  async profile(id: number): Promise<User> {
    // const user = (await this.findOne("id", id)) as User;

    let _query = this.repository.createQueryBuilder("user");

    return (await _query.where("user.id = :id", { id }).getOne()) as User;
  }
}
