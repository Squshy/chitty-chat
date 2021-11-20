import React from "react";
import { FriendResponse } from "../../generated/graphql";

interface FriendDisplayProps {
  friend: FriendResponse;
}

export const FriendDisplay: React.FC<FriendDisplayProps> = ({ friend }) => {
  return (
    <div className="w-full border border-[#383838] rounded-md p-2">
      <p className="text-lg font-semibold">{friend.user.displayName}</p>
      <p className="text-sm font-thin">{friend.user.username}</p>
    </div>
  );
};
