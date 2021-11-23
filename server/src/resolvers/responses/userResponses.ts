import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
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

/*  OBJECT TYPE  */

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

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
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => [User], { nullable: true })
  friends?: User[];
}
