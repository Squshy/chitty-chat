import { TrashIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { FriendFragment } from "../../generated/graphql";

interface PendingFriendProps {
  friend: FriendFragment;
  revoke: () => void;
}

export const PendingFriend: React.FC<PendingFriendProps> = ({
  friend,
  revoke,
}) => {
  return (
    <div className="transition duration-75 ease-out w-full p-2 flex justify-between hover:bg-white hover:bg-opacity-10">
      <div>
        <p className="text-lg font-semibold">{friend.displayName}</p>
        <p className="text-sm font-thin">{friend.username}</p>
      </div>
      <div className="flex justify-center">
        <button onClick={revoke}>
          <XIcon className="transition duration-75 ease-out w-6 text-viat-error text-opacity-50 hover:text-opacity-100" />
        </button>
      </div>
    </div>
  );
};
