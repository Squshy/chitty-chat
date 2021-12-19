import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection, getCustomRepository } from "typeorm";
import { Friend } from "../entities/Friend";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { UserRepository } from "../repositories/User";
import { MyContext } from "../types";
import { doesUserExist } from "../util/doesUserExists";
import { FriendResponse } from "./responses/friendResponses";

@Resolver(Friend)
export class FriendResolver {
  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAuth)
  async searchForUser(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ) {
    // const users = await getConnection().query(
    //   `
    //   SELECT *, username <-> $2 AS dist
    //   FROM "user" U
    //   LEFT JOIN friend f
    //     ON f.user_id = U.id AND f.friend_id = $1
    //     OR f.user_id = $1 AND f.friend_id = U.id
    //   WHERE U.id <> $1 AND f.user_id IS NULL OR U.id <> $1 AND f.friend_id IS NULL
    //   ORDER BY dist
    //   LIMIT 10
    // `,
    //   [req.session.userId, username]
    // );
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.searchForUser(
      req.session.userId as string,
      username
    );
    console.log("users:", users);
    return users;
  }

  @Mutation(() => FriendResponse)
  @UseMiddleware(isAuth)
  async addFriend(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<FriendResponse> {
    const { friend, error } = await doesUserExist(username);
    if (error) return { error };

    const exists = await Friend.findOne({
      where: [
        { userId: req.session.userId, friendId: friend!.id },
        { userId: friend!.id, friendId: req.session.userId },
      ],
    });
    if (exists)
      return {
        error:
          "You are already friends with this user, or a request has already been sent.",
      };

    try {
      await Friend.create({
        confirmed: false,
        friendId: friend!.id,
        userId: req.session.userId!,
      }).save();
    } catch (error) {
      return { error };
    }
    return { friend };
  }

  @Mutation(() => FriendResponse)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<FriendResponse> {
    const { friend, error } = await doesUserExist(username);
    if (error) return { error };

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Friend)
        .set({ confirmed: true })
        .where(
          "user_id = :me AND friend_id = :friend OR user_id = :friend AND friend_id = :me",
          {
            me: req.session.userId,
            friend: friend!.id,
          }
        )
        .execute();
    } catch (error) {
      return { error };
    }

    return { friend };
  }

  @Mutation(() => FriendResponse)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ) {
    const { friend, error } = await doesUserExist(username);
    if (error) return { error };

    try {
      getConnection()
        .createQueryBuilder()
        .delete()
        .from(Friend)
        .where("user_id = :friend AND friend_id = :me", {
          friend: friend!.id,
          me: req.session.userId,
        })
        .execute();
    } catch (error) {
      return { error };
    }
    return { friend };
  }

  @Mutation(() => FriendResponse)
  @UseMiddleware(isAuth)
  async revokeFriendRequest(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<FriendResponse> {
    const { friend, error } = await doesUserExist(username);
    if (error) return { error };

    try {
      getConnection()
        .createQueryBuilder()
        .delete()
        .from(Friend)
        .where("user_id = :me AND friend_id = :friend", {
          me: req.session.userId,
          friend: friend!.id,
        })
        .execute();
    } catch (error) {
      return { error };
    }
    return { friend };
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: MyContext): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    const friends = await userRepository.getFriends(
      req.session.userId as string
    );
    console.log("Friends:", friends);
    return friends;
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
