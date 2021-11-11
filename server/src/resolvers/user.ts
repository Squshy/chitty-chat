import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { hash as hashPassword } from "argon2";
import { getConnection } from "typeorm";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@ObjectType()
class UserResponse {}

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPass = await hashPassword(options.password);

    const user = User.create({
      email: options.email,
      username: options.username,
      password: hashedPass,
    }).save();

    return user;
  }

  @Mutation(() => User)
  async login(@Arg("options") options: UsernamePasswordInput) {
    const user = User.findOne({ username: options.username.toLowerCase() });
  }
}
