import React from "react";

interface ConversationListProps {}

export const ConversationList: React.FC<ConversationListProps> = ({}) => {
  return (
    <div className="w-full bg-back bg-opacity-50 flex flex-grow py-2 px-4">
      Conversation List
    </div>
  );
};
