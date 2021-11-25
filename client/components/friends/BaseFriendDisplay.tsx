import React from "react";
import { FriendFragment } from "../../generated/graphql";

interface BaseFriendDisplayProps {
  friend: FriendFragment;
}

export const BaseFriendDisplay: React.FC<BaseFriendDisplayProps> = ({
  friend,
  children,
}) => {
  return (
    <div className="transition duration-75 ease-out w-full p-2 flex justify-between hover:bg-white hover:bg-opacity-10">
      <div>
        <p className="text-lg font-semibold">{friend.displayName}</p>
        <p className="text-sm font-thin text-viat-666">{friend.username}</p>
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};
