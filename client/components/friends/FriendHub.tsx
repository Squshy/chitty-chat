import React, { useState } from "react";
import { FriendSorts } from "../../constants";
import { FriendList } from "./FriendList";
import { FriendsHeader } from "./FriendsHeader";
import { PendingFriends } from "./PendingFriends";

interface FriendHubProps {}

export const FriendHub: React.FC<FriendHubProps> = ({}) => {
  const [currentOption, setCurrentOption] = useState(FriendSorts.online);

  const ShowFriends = () => {
    switch (currentOption) {
      case FriendSorts.pending:
        return <PendingFriends />;
      default:
        return <FriendList />;
    }
  };

  return (
    <>
      <FriendsHeader currentOption={currentOption} onClick={setCurrentOption} />
      <div className="flex-col w-full bg-opacity-50 flex flex-grow space-y-4 p-8">
        <ShowFriends />
      </div>
    </>
  );
};
