import React from "react";

interface FormErrorMessageProps {
  text: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ text }) => {
  return <p className="text-[#DA0037] text-xs">{text}</p>;
};
