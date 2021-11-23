import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { FriendFragment } from "../../generated/graphql";

interface PendingFriendProps {
  friend: FriendFragment;
}

export const PendingFriend: React.FC<PendingFriendProps> = ({ friend }) => {
  return (
    <div className="transition duration-75 ease-out w-full p-2 flex justify-between hover:bg-white hover:bg-opacity-10">
      <div>
        <p className="text-lg font-semibold">{friend.displayName}</p>
        <p className="text-sm font-thin">{friend.username}</p>
      </div>
      <div className="flex justify-center">
        <button>
          <TrashIcon className="w-6 text-red-500" />
        </button>
      </div>
    </div>
  );
};
