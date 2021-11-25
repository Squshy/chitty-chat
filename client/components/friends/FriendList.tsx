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
          return <BaseFriendDisplay friend={friend} key={friend.username} />;
        })}
      </div>
    </div>
  );
};
