import React from "react";

interface HeaderButtonProps {
  text: string;
  selected: boolean;
  onClick: Function;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  text,
  selected,
  onClick,
}) => {
  return (
    <button
      className={`transition duration-150 ease-out mx-2 p-2 rounded-md hover:bg-opacity-25 hover:bg-gray-500${
        selected && " bg-opacity-25 bg-gray-500"
      }`}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};
