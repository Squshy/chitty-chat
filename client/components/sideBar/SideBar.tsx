import React from "react";
import { User } from "../../generated/graphql";
import { FriendsList } from "../friends/FriendsList";
import { CogIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { BaseLogoutButton } from "../buttons/BaseLogoutButton";

interface SideBarProps {
  user: User;
}

export const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full w-64 bg-mid">
      <div className="w-full border-b border-gray-500 p-4 shadow-md">
        <p className="text-lg font-semibold">{user.displayName}</p>
        <p className="text-sm text-gray-400">{user.username}</p>
      </div>
      <FriendsList />
      <div className="flex p-2 justify-end space-x-4">
        <CogIcon className="w-8 h-8" />
        <BaseLogoutButton>
          <LogoutIcon className="w-8 h-8" />
        </BaseLogoutButton>
      </div>
    </div>
  );
};
