import { Request, Response } from "express";
import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "./entities/User";
import { Redis } from "ioredis";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};

/*   INPUT TYPES   */

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

/*  OBJECT TYPE  */

// object types can be returned
@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class FriendResponse {
  @Field(() => User)
  user!: User;
  @Field(() => Boolean)
  confirmed!: boolean;
  @Field(() => String)
  initiator!: string;
}

@ObjectType()
export class FriendList {
  @Field(() => [FriendResponse])
  friends!: FriendResponse[];

  @Field(() => [FriendResponse])
  pending!: FriendResponse[];

  @Field(() => [FriendResponse])
  requests!: FriendResponse[];
}
