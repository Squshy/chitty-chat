import React from "react";
import { FriendResponse } from "../../generated/graphql";

interface FriendDisplayProps {
  friend: FriendResponse;
}

export const FriendDisplay: React.FC<FriendDisplayProps> = ({ friend }) => {
  return (
    <div className="w-full border border-gray-600 rounded-md p-2">
      <p className="text-lg font-semibold">{friend.user.displayName}</p>
      <p className="text-sm font-thin">{friend.user.username}</p>
      {!friend.confirmed && friend.initiator === friend.user.id ? (
        "New Request"
      ) : (
        <p className="text-xs text-gray-400 italic">Pending&#8230;</p>
      )}
    </div>
  );
};
