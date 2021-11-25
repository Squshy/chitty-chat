import React from "react";
import { FriendFragment } from "../../generated/graphql";
import { DeclineIcon } from "../declineIcon";
import { BaseFriendDisplay } from "./BaseFriendDisplay";

interface PendingFriendProps {
  friend: FriendFragment;
  disabled: boolean;
  revoke: () => void;
}

export const PendingFriend: React.FC<PendingFriendProps> = ({
  friend,
  disabled,
  revoke,
}) => {
  return (
    <BaseFriendDisplay friend={friend}>
      <button onClick={revoke} disabled={disabled}>
        <DeclineIcon />
      </button>
    </BaseFriendDisplay>
  );
};
