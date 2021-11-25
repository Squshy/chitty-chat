import { CheckIcon } from "@heroicons/react/solid";
import React from "react";

interface AcceptIconProps {}

export const AcceptIcon: React.FC<AcceptIconProps> = ({}) => {
  return <CheckIcon className="transition transform duration-75 ease-out w-6 hover:scale-110 text-green-500 text-opacity-50 hover:text-opacity-100 self-center" />;
};
