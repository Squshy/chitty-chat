import { ChatAlt2Icon } from "@heroicons/react/solid";
import React from "react";
import { useFriendsQuery } from "../../generated/graphql";
import { BaseFriendDisplay } from "./BaseFriendDisplay";

interface FriendListProps {}

export const FriendList: React.FC<FriendListProps> = ({}) => {
  const { data: friends } = useFriendsQuery();
  return (
    <div>
      <div>
        {friends?.friends.map((friend) => {
          return (
            <BaseFriendDisplay friend={friend} key={friend.username}>
              <ChatAlt2Icon className="w-6 text-viat-666" />
            </BaseFriendDisplay>
          );
        })}
      </div>
    </div>
  );
};
