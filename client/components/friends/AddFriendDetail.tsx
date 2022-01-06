import { UserAddIcon } from "@heroicons/react/solid";
import React from "react";
import { FriendFragment } from "../../generated/graphql";

interface AddFriendDetailProps {
  user: FriendFragment;
  addFriend: () => void;
  disabled: boolean;
}

export const AddFriendDetail: React.FC<AddFriendDetailProps> = ({
  user,
  disabled,
  addFriend,
}) => {
  return (
    <div className="transition transform duration-75 ease-out flex justify-between w-full p-2 rounded hover:bg-white hover:bg-opacity-25 group">
      <div className="flex flex-row justify-center items-center space-x-2">
        <img src={user.profile.avatar} className="h-8 rounded-md" />
        <div className="flex flex-col">
          <p className="font-semibold">{user.profile.displayName}</p>
          <p className="italic text-xs text-gray-500 group-hover:text-gray-300">
            {user.username}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={addFriend} disabled={disabled}>
          <UserAddIcon className="transform duration-75 ease-in-out w-6 text-green-400 hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
