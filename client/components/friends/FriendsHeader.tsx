import { UserAddIcon, UsersIcon } from "@heroicons/react/solid";
import React from "react";
import { FriendSorts } from "../../constants";
import { HeaderButton } from "./HeaderButton";

interface HeaderProps {
  currentOption: string;
  onClick: (a: string) => void;
}

export const FriendsHeader: React.FC<HeaderProps> = ({
  currentOption,
  onClick,
}) => {
  return (
    <div className="flex justify-between shadow-md w-full p-2">
      <div className="flex items-center">
        <UsersIcon className="w-6 h-6 self-center" />
        <span className="font-semibold ml-1">Friends</span>
      </div>
      <div className="flex -mx-2">
        {Object.values(FriendSorts).map((sort) => (
          <HeaderButton
            text={sort}
            selected={currentOption === sort}
            onClick={() => onClick(sort)}
          />
        ))}
        <button className="group transition duration 150 ease-out mx-2 p-2 self-center hover:bg-opacity-75 rounded-md">
          <UserAddIcon className="transform transition duration-150 ease-out w-6 h-6 text-green-400 group-hover:scale-105 group-hover:text-green-600" />
        </button>
      </div>
    </div>
  );
};
