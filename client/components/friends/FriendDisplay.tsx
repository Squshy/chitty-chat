import React from "react";
import { FriendResponse } from "../../generated/graphql";

interface FriendDisplayProps {
  friend: FriendResponse;
  pending?: boolean;
  incoming?: boolean;
}

export const FriendDisplay: React.FC<FriendDisplayProps> = ({
  friend,
  incoming,
  pending,
}) => {
  return (
    <div className="w-full border border-[#383838] rounded-md p-2">
      <p className="text-lg font-semibold">{friend.user.displayName}</p>
      <p className="text-sm font-thin">{friend.user.username}</p>
      {pending && <p className="italic text-xs text-gray-400">Pending...</p>}
    </div>
  );
};
