import { UserAddIcon, UsersIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { FriendResponse, useFriendsQuery } from "../../generated/graphql";
import { FriendDisplay } from "./FriendDisplay";
import { HeaderButton } from "./HeaderButton";

interface FriendsListProps {}

const FriendSorts = {
  online: "Online",
  all: "All",
  pending: "Pending",
  blocked: "Blocked",
};

export const FriendsList: React.FC<FriendsListProps> = ({}) => {
  const { data, loading } = useFriendsQuery();
  const [friendSort, setFriendSort] = useState(FriendSorts.online);

  if (loading) {
    return (
      <div className="w-full bg-back bg-opacity-50 flex flex-grow">
        Loading...
      </div>
    );
  } else if (data?.friends.length === 0 && !loading) {
    return (
      <div className="w-full bg-back bg-opacity-50 flex flex-grow">
        <p className="text-gray-400 italic">No friends to display</p>
      </div>
    );
  } else
    return (
      <>
        <div className="flex justify-between border-b shadow-md border-[#383838] w-full p-2">
          <div className="flex items-center">
            <UsersIcon className="w-6 h-6 self-center" />
            <span className="font-semibold ml-1">Friends</span>
          </div>
          <div className="flex -mx-2">
            {Object.values(FriendSorts).map((sort) => (
              <HeaderButton
                text={sort}
                selected={friendSort === sort}
                onClick={setFriendSort}
              />
            ))}
            <button className="group transition duration 150 ease-out mx-2 p-2 self-center bg-back hover:bg-opacity-75 rounded-md">
              <UserAddIcon className="transform transition duration-150 ease-out w-6 h-6 text-purple-500 group-hover:scale-105 group-hover:text-purple-400" />
            </button>
          </div>
        </div>
        <div className="flex-col w-ful bg-opacity-50 flex flex-grow space-y-4 p-8">
          {data?.friends.map((friend) => {
            switch (friendSort) {
              case FriendSorts.pending: {
                if (friend.confirmed === false)
                  return (
                    <FriendDisplay
                      key={friend.user.id}
                      friend={friend as FriendResponse}
                    />
                  );
                break;
              }
              case FriendSorts.all: {
                if (friend.confirmed === false) return;
                return (
                  <FriendDisplay
                    key={friend.user.id}
                    friend={friend as FriendResponse}
                  />
                );
              }
              default:
                return;
            }
          })}
        </div>
      </>
    );
};
