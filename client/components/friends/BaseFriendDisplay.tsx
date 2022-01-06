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
    <div className="transition duration-75 ease-out w-full p-2 flex justify-between hover:bg-white hover:bg-opacity-10 max-h-16">
      <div className="flex flex-row space-x-2">
        <img src={friend.profile.avatar} className="h-full rounded-xl" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{friend.profile.displayName}</p>
          <p className="text-sm font-thin text-viat-666">{friend.username}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};
