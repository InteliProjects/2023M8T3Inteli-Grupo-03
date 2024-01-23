import {
  Index,
  Column,
  Entity,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { UnauthorizedException } from "@nestjs/common";

import { SQLBaseEntity } from "../../utils/base-entity.utils";
////////////////////////////////////////////////////////////////////////////////

@Entity()
export class User extends SQLBaseEntity {
  /** --- properties -----------------------------------------------------------*/
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  passwordConfirm: string;

  /** --- hooks ----------------------------------------------------------------*/
  @BeforeInsert()
  async function() {
    // check password match and encrypt password
    await passwordMatch.call(this);
  }

  /** --- constructor-----------------------------------------------------------*/
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

/** --- helper authentication methods ----------------------------------------*/
export async function passwordMatch(this: Partial<User>) {
  if (!this.password || !this.passwordConfirm)
    throw new UnauthorizedException(
      "Password and password confirmation required"
    );

  if (this.password !== this.passwordConfirm) {
    throw new UnauthorizedException(
      "Password and password confirmation must match"
    );
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  return this;
}

export async function decryptPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
