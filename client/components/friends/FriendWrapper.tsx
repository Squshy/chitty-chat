import React from "react";

interface FriendWrapperProps {}

export const FriendWrapper: React.FC<FriendWrapperProps> = ({ children }) => {
  return (
    <div className="transition duration-75 ease-out w-full p-2 flex justify-between hover:bg-white hover:bg-opacity-10">
      {children}
    </div>
  );
};
