import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { hash as hashPassword, verify } from "argon2";
import { validateRegister } from "../util/validateUsernamePasswordInput";
import { handleRegisterErrors } from "../util/handleRegisterErrors";
import {
  COOKIE_NAME,
  FORGOT_PASSWORD_DAY_LIMIT,
  FORGOT_PASSWORD_PREFIX,
  __prod__,
} from "../constants";
import { getConnection, getCustomRepository } from "typeorm";
import { sendEmail } from "../util/sendEmail";
import { v4 as uuid } from "uuid";
import { validatePassword } from "../util/validatePassword";
import { isAuth } from "../middleware/isAuth";
import { Friend } from "../entities/Friend";
import { UserRepository } from "../repositories/User";
import {
  UserResponse,
  UsernamePasswordInput,
  FriendResponse,
} from "./responses/userResponses";

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
  @UseMiddleware(isAuth)
  async searchForUser(
    @Arg("username") username: String,
    @Ctx() { req }: MyContext
  ) {
    const results = await getConnection()
      .createQueryBuilder()
      .select(`*, username <-> '${username}' AS dist`)
      .where("id != :id AND visibility = :visibility", {
        id: req.session.userId,
        visibility: "public",
      })
      .from(User, "user")
      .orderBy(`dist`)
      .limit(10)
      .getRawMany();
    return results;
  }

  @Mutation(() => FriendResponse)
  @UseMiddleware(isAuth)
  async addFriend(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<FriendResponse> {
    const friendToAdd = await User.findOne({ username: username });
    if (!friendToAdd) return { error: "That user does not exists" };

    const exists = await Friend.findOne({
      where: [
        { userId: req.session.userId, friendId: friendToAdd.id },
        { userId: friendToAdd.id, friendId: req.session.userId },
      ],
    });
    if (exists)
      return {
        error: "This friendship already exists, or is currently pending.",
      };

    await Friend.create({
      confirmed: false,
      friendId: friendToAdd.id,
      userId: req.session.userId,
    }).save();

    const userRepository = getCustomRepository(UserRepository);
    const friends = await userRepository.getPendingFriendRequests(
      req.session.userId as string
    );

    return { friends };
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: MyContext): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.getFriends(req.session.userId as string);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async pendingFriends(@Ctx() { req }: MyContext): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.getPendingFriendRequests(
      req.session.userId as string
    );
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async friendRequests(@Ctx() { req }: MyContext): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.getFriendRequests(req.session.userId as string);
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ email: email });
    if (!user) return true;

    const token = uuid();
    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * FORGOT_PASSWORD_DAY_LIMIT
    );

    const text = `<a href="${
      __prod__ ? "prod site" : `http://localhost:3000/change-password/${token}`
    }">Reset password</a>`;

    await sendEmail(email, "Password Reset", text);
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    const errors = validatePassword(newPassword, "newPassword");
    if (errors) return { errors };
    const redisKey = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(redisKey);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }
    const user = await User.findOne(userId);
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    await User.update(userId, { password: await hashPassword(newPassword) });
    redis.del(redisKey);
    req.session.userId = user.id;
    return { user };
  }
}
