import { User } from "../user/entities/user.entity";

/**
 * @description PassportJwt is used to define the shape of the data returned
 * from the passport-jwt strategy.
 */
export interface PassportJwt {
  access_token: string;
}

/**
 * @description PassporRequest is used to define the shape of the request
 * object after the passport middleware has been applied.
 */
export interface PassportRequest extends Request {
  user?: User;
}
