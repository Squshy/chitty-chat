import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/User";
import { FriendResponse } from "../resolvers/responses/friendResponses";

export const doesUserExist = async (
  username: string
): Promise<FriendResponse> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUser({ username: username });
  if (!user) return { error: "That user does not exist" };
  return { friend: user };
};
