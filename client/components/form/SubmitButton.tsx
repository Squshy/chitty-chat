import React from "react";

interface SubmitButtonProps {
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="transition duration-150 ease-out mx-4 my-2 w-full shadow-sm bg-purple-700 py-2 px-4 rounded-md text-white font-semibold hover:bg-purple-600"
    >
      {text}
    </button>
  );
};
