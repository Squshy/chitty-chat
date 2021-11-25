import { User } from "../entities/User";
import { FriendResponse } from "../resolvers/responses/friendResponses";

export const doesUserExist = async (
  username: string
): Promise<FriendResponse> => {
  const user = await User.findOne({ username: username });
  if (!user) return { error: "That user does not exist" };
  return { friend: user };
};
