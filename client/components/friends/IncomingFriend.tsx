import React from "react";
import { FriendFragment } from "../../generated/graphql";
import { AcceptIcon } from "../AcceptIcon";
import { DeclineIcon } from "../declineIcon";
import { BaseFriendDisplay } from "./BaseFriendDisplay";

interface IncomingFriendProps {
  friend: FriendFragment;
  disableAccept: boolean;
  disableDecline: boolean;
  decline: () => void;
  accept: () => void;
}

export const IncomingFriend: React.FC<IncomingFriendProps> = ({
  friend,
  accept,
  disableAccept,
  disableDecline,
  decline,
}) => {
  return (
    <BaseFriendDisplay friend={friend}>
      <div className="flex jsutify-center justify-between p-2 space-x-2">
        <button onClick={accept} disabled={disableAccept}>
          <AcceptIcon />
        </button>
        <button onClick={decline} disabled={disableDecline}>
          <DeclineIcon />
        </button>
      </div>
    </BaseFriendDisplay>
  );
};
