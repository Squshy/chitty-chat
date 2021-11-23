import React from "react";
import { usePendingFriendsQuery } from "../../generated/graphql";
import { PendingFriend } from "./PendingFriend";

interface PendingFriendsProps {}

export const PendingFriends: React.FC<PendingFriendsProps> = ({}) => {
  const { data, loading } = usePendingFriendsQuery();
  return (
    <div className="divide-y divide-[#383838] border-t border-b border-[#383838]">
      {data?.pendingFriends.map((friend) => {
        return <PendingFriend key={friend.username} friend={friend} />;
      })}
    </div>
  );
};
