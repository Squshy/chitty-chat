import React from "react";
import { usePendingFriendsQuery } from "../../generated/graphql";
import { PendingFriend } from "./PendingFriend";

interface PendingFriendsProps {}

export const PendingFriends: React.FC<PendingFriendsProps> = ({}) => {
  const { data, loading } = usePendingFriendsQuery();

  const Pending = () => {
    if (data?.pendingFriends) {
      if (data.pendingFriends.length > 0) {
        return (
          <>
            {data.pendingFriends.map((friend) => {
              return <PendingFriend key={friend.username} friend={friend} />;
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
