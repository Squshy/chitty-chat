import React from "react";
import { User } from "../../generated/graphql";
import { CogIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { BaseLogoutButton } from "../buttons/BaseLogoutButton";
import { ConversationList } from "../conversations/ConversationList";

interface SideBarProps {
  user: User;
}

export const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full w-64 bg-back">
      <div className="w-full p-4">
        <p className="text-lg font-semibold">{user.displayName}</p>
        <p className="text-sm text-gray-400">{user.username}</p>
      </div>
      <p className="font-semibold pl-4 text-gray-300">CONVERSATIONS</p>
      <ConversationList />
      <div className="flex p-2 justify-end space-x-4 bg-[#171717]">
        <CogIcon className="w-8 h-8" />
        <BaseLogoutButton>
          <LogoutIcon className="w-8 h-8" />
        </BaseLogoutButton>
      </div>
    </div>
  );
};
