import { Request, Response } from "express";
import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "./entities/User";

export type MyContext = {
  req: Request;
  res: Response;
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
