import { EntityRepository, getConnection, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getPendingFriendRequests(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.friend_id
        WHERE U.id <> $1 AND f.confirmed = FALSE`,
      [userId]
    );
  }

  getFriends(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.user_id OR U.id = f.friend_id
        WHERE U.id <> $1 AND f.confirmed = TRUE 
          AND EXISTS(
            SELECT 1
            FROM friend F
            WHERE (F."user_id" = $1 AND F."friend_id" = U.id )
            OR (F."user_id" = $1 AND F."friend_id" = U.id )
            );`,
      [userId]
    );
  }
  getFriendRequests(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.user_id
        WHERE U.id <> $1 AND f.confirmed = FALSE`,
      [userId]
    );
  }
}
