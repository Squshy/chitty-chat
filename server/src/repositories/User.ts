import { EntityRepository, getConnection, Repository } from "typeorm";
import { DEFAULT_AVATAR } from "../constants";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import { UsernamePasswordInput } from "../resolvers/responses/userResponses";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getPendingFriendRequests(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.friend_id AND f.user_id = $1
        WHERE U.id <> $1 AND f.confirmed = FALSE`,
      [userId]
    );
  }

  getFriends(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.user_id OR U.id = f.friend_id
        WHERE U.id <> $1 AND f.confirmed = TRUE`,
      [userId]
    );
  }

  getFriendRequests(userId: string): Promise<User[]> {
    return getConnection().query(
      ` SELECT *
        FROM "user" U
        LEFT JOIN friend f ON U.id = f.user_id AND f.friend_id = $1
        WHERE U.id <> $1 AND f.confirmed = FALSE`,
      [userId]
    );
  }

  async createUser(
    options: UsernamePasswordInput,
    password: string
  ): Promise<User[]> {
    return getConnection().query(
      `
    WITH new_profile AS 
      (
        WITH ins (vis, avatar, display) AS
          ( VALUES
            ('public', $1, $2)
          )
        INSERT INTO profile (visibility, avatar, "displayName")
        
        SELECT 
            visibility.id, ins.avatar, ins.display
        FROM 
            visibility JOIN ins ON ins.vis = visibility.type 
        RETURNING id
      )
    INSERT INTO "user" (username, email, profile, password)
    VALUES
    ($2, $3, (SELECT id FROM new_profile), $4) RETURNING *;
    `,
      [DEFAULT_AVATAR, options.username, options.email, password]
    );
  }
}
