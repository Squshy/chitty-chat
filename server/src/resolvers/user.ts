import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext, UsernamePasswordInput, UserResponse } from "../types";
import { hash as hashPassword, verify } from "argon2";
import { validateRegister } from "../util/validateUsernamePasswordInput";
import { handleRegisterErrors } from "../util/handleRegisterErrors";
import { COOKIE_NAME } from "../constants";
import { getConnection, ILike } from "typeorm";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) return null;
    const user = await User.findOne({ id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) return { errors };
    const hashedPass = await hashPassword(options.password);

    let user;
    try {
      user = await User.create({
        email: options.email,
        username: options.username,
        displayName: options.username,
        password: hashedPass,
      }).save();
    } catch (err) {
      const errors = handleRegisterErrors(err.code, err.detail);
      return { errors };
    }

    // auto login user after register
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: String,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail.toLowerCase() } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "username does not exist",
          },
        ],
      };
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log("logout error:", err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Query(() => [User], { nullable: true })
  async searchForUser(@Arg("username") username: String) {
    const results = await getConnection()
      .createQueryBuilder()
      .select(`*, username <-> '${username}' AS dist`)
      .from(User, "user")
      .orderBy(`dist`)
      .limit(10)
      .getRawMany();
    return results;
  }
}
