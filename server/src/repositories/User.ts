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
  ): Promise<User> {
    // const profile = new Profile();
    // profile.avatar = DEFAULT_AVATAR;
    // profile.displayName = options.username;

    await getConnection().query(`
    WITH prof (vis, avatar, display) AS
      ( VALUES
        ('public', '${DEFAULT_AVATAR}', '${options.username}')
      )
    INSERT INTO profile (visibility, avatar, "displayName")
    
    SELECT 
        visibility.id, prof.avatar, prof.display
    FROM 
        visibility JOIN prof ON prof.vis = visibility.type;
    `);

    const user = new User();
    user.email = options.email;
    user.username = options.username;
    user.password = password;
    return User.create(user).save();
    // return getConnection().query(`

    // `);
  }
}
