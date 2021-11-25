import { useApolloClient } from "@apollo/client";
import React from "react";
import {
  FriendFragment,
  PendingFriendsDocument,
  PendingFriendsQuery,
  usePendingFriendsQuery,
  useRevokeFriendRequestMutation,
} from "../../generated/graphql";
import { PendingFriend } from "./PendingFriend";

interface PendingFriendsProps {}

export const PendingFriends: React.FC<PendingFriendsProps> = ({}) => {
  const { data, loading } = usePendingFriendsQuery();
  const [revokeFriendRequest] = useRevokeFriendRequestMutation();
  const client = useApolloClient();

  const revoke = async (username: string) => {
    await revokeFriendRequest({
      variables: { username: username },
      update: (cache, { data }) => {
        if (!data?.revokeFriendRequest.error)
          cache.writeQuery<PendingFriendsQuery>({
            query: PendingFriendsDocument,
            data: {
              __typename: "Query",
              pendingFriends: [
                ...(cache
                  .readQuery<PendingFriendsQuery>({
                    query: PendingFriendsDocument,
                  })
                  ?.pendingFriends.filter(
                    (f) =>
                      f.username !== data!.revokeFriendRequest.friend!.username
                  ) || []),
              ],
            },
          });
      },
    });
  };

  const Pending = () => {
    if (data?.pendingFriends) {
      if (data.pendingFriends.length > 0) {
        return (
          <>
            {data.pendingFriends.map((friend) => {
              return (
                <PendingFriend
                  key={friend.username}
                  friend={friend}
                  revoke={() => revoke(friend.username)}
                />
              );
            })}
          </>
        );
      }
    }
    return (
      <div className="p-4">
        <p className="italic text-[#666666] text-center">
          You have no pending friend requests
        </p>
      </div>
    );
  };

  return (
    <div className="divide-y divide-[#383838] border-t border-b border-[#383838]">
      <Pending />
    </div>
  );
};
