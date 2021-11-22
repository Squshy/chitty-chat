import React, { useState } from "react";
import { FriendSorts } from "../../constants";
import { FriendResponse, useFriendsQuery } from "../../generated/graphql";
import { FriendDisplay } from "./FriendDisplay";
import { FriendsHeader } from "./FriendsHeader";

interface FriendsListProps {}

export const FriendsList: React.FC<FriendsListProps> = ({}) => {
  const { data, loading } = useFriendsQuery();
  const [currentOption, setCurrentOption] = useState(FriendSorts.online);

  const ShowList = () => {
    switch (currentOption) {
      case FriendSorts.pending: {
        return (
          <>
            {data?.friends.pending.map((friend) => {
              return (
                <FriendDisplay
                  key={friend.user.username}
                  friend={friend as FriendResponse}
                  pending
                />
              );
            })}
          </>
        );
      }
      case FriendSorts.blocked: {
        return <div>BLOCKED PPL HERE SOON PLS</div>;
      }
      // all
      default: {
        if (data?.friends.friends.length === 0) {
          return (
            <div className="flex w-full items-center justify-center">
              <p className="text-center text-gray-500 italic text-lg">
                Lmao you have no friends
              </p>
            </div>
          );
        } else
          return (
            <>
              {data?.friends.friends.map((friend) => {
                return (
                  <FriendDisplay
                    key={friend.user.username}
                    friend={friend as FriendResponse}
                  />
                );
              })}
            </>
          );
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-back bg-opacity-50 flex flex-grow">
        Loading...
      </div>
    );
  } else
    return (
      <>
        <FriendsHeader
          currentOption={currentOption}
          onClick={setCurrentOption}
        />
        <div className="flex-col w-ful bg-opacity-50 flex flex-grow space-y-4 p-8">
          <ShowList />
        </div>
      </>
    );
};
