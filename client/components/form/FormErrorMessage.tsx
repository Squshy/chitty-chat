import React from "react";

interface FormErrorMessageProps {
  text: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ text }) => {
  return <p className="text-red-500 text-xs italic">{text}</p>;
};
