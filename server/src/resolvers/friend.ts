import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection, getCustomRepository } from "typeorm";
import { Friend } from "../entities/Friend";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { UserRepository } from "../repositories/User";
import { MyContext } from "../types";
import { FriendResponse } from "./responses/userResponses";

@Resolver(Friend)
export class FriendResolver {
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
}
