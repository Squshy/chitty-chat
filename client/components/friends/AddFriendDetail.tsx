import { UserAddIcon } from "@heroicons/react/solid";
import React from "react";

interface AddFriendDetailProps {
  username: string;
  displayName: string;
  addFriend: () => void;
  disabled: boolean;
}

export const AddFriendDetail: React.FC<AddFriendDetailProps> = ({
  username,
  displayName,
  disabled,
  addFriend,
}) => {
  return (
    <div className="transition transform duration-75 ease-out flex justify-between w-full p-2 rounded hover:bg-white hover:bg-opacity-25 group">
      <div className="flex flex-col">
        <p className="font-semibold">{displayName}</p>
        <p className="italic text-xs text-gray-500 group-hover:text-gray-300">
          {username}
        </p>
      </div>
      <div className="flex justify-center">
        <button onClick={addFriend} disabled={disabled}>
          <UserAddIcon className="transform duration-75 ease-in-out w-6 text-green-400 hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
