import { XIcon } from "@heroicons/react/solid";
import React from "react";

interface DeclineIconProps {}

export const DeclineIcon: React.FC<DeclineIconProps> = ({}) => {
  return (
    <XIcon
      className="transition transform duration-75 ease-out w-6 hover:scale-110 text-viat-error text-opacity-50 hover:text-opacity-100 self-center"
    />
  );
};
