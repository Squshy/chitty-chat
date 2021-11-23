import { ObjectType, Field } from "type-graphql";
import { User } from "../../entities/User";

@ObjectType()
export class FriendResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => User, { nullable: true })
  friend?: User;
}
