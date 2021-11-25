import React from "react";
import {
  FriendRequestsDocument,
  FriendRequestsQuery,
  FriendsDocument,
  FriendsQuery,
  PendingFriendsDocument,
  PendingFriendsQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useFriendRequestsQuery,
  usePendingFriendsQuery,
  useRevokeFriendRequestMutation,
} from "../../generated/graphql";
import { IncomingFriend } from "./IncomingFriend";
import { PendingBlock } from "./PendingBlock";
import { PendingFriend } from "./PendingFriend";

interface PendingFriendsProps {}

export const PendingFriends: React.FC<PendingFriendsProps> = ({}) => {
  const { data: pending } = usePendingFriendsQuery();
  const { data: incoming } = useFriendRequestsQuery();
  const [revokeFriendRequest, { loading: revokeLoading }] =
    useRevokeFriendRequestMutation();
  const [acceptFriendRequest, { loading: acceptLoading }] =
    useAcceptFriendRequestMutation();
  const [declineFriendRequest, { loading: declineLoading }] =
    useDeclineFriendRequestMutation();

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

  const decline = async (username: string) => {
    await declineFriendRequest({
      variables: { username: username },
      update: (cache, { data }) => {
        if (!data?.declineFriendRequest.error) {
          cache.writeQuery<FriendRequestsQuery>({
            query: FriendRequestsDocument,
            data: {
              __typename: "Query",
              friendRequests: [
                ...(cache
                  .readQuery<FriendRequestsQuery>({
                    query: FriendRequestsDocument,
                  })
                  ?.friendRequests.filter(
                    (f) =>
                      f.username !== data!.declineFriendRequest.friend!.username
                  ) || []),
              ],
            },
          });
        }
      },
    });
  };

  const accept = async (username: string) => {
    await acceptFriendRequest({
      variables: { username: username },
      update: (cache, { data }) => {
        if (
          !data?.acceptFriendRequest.error &&
          data?.acceptFriendRequest.friend
        ) {
          cache.writeQuery<FriendRequestsQuery>({
            query: FriendRequestsDocument,
            data: {
              __typename: "Query",
              friendRequests: [
                ...(cache
                  .readQuery<FriendRequestsQuery>({
                    query: FriendRequestsDocument,
                  })
                  ?.friendRequests.filter(
                    (f) =>
                      f.username !== data!.acceptFriendRequest.friend!.username
                  ) || []),
              ],
            },
          });
          cache.writeQuery<FriendsQuery>({
            query: FriendsDocument,
            data: {
              __typename: "Query",
              friends: [
                ...(cache.readQuery<FriendsQuery>({
                  query: FriendsDocument,
                })?.friends || []),
                data.acceptFriendRequest.friend,
              ],
            },
          });
        }
      },
    });
  };

  return (
    <div className="space-y-12">
      <PendingBlock title="Incoming Friend Requests" type="incoming">
        {incoming?.friendRequests &&
          incoming.friendRequests.length > 0 &&
          incoming.friendRequests.map((friend) => {
            return (
              <IncomingFriend
                key={friend.username}
                friend={friend}
                disableAccept={acceptLoading}
                disableDecline={declineLoading}
                accept={() => accept(friend.username)}
                decline={() => decline(friend.username)}
              />
            );
          })}
      </PendingBlock>
      <PendingBlock
        title="Pending Friend Requests"
        type="pending"
        className="mt-4"
      >
        {pending?.pendingFriends &&
          pending.pendingFriends.length > 0 &&
          pending.pendingFriends.map((friend) => {
            return (
              <PendingFriend
                key={friend.username}
                friend={friend}
                disabled={revokeLoading}
                revoke={() => revoke(friend.username)}
              />
            );
          })}
      </PendingBlock>
    </div>
  );
};
