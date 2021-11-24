import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FormErrorMessage } from "./FormErrorMessage";

type FormLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const FormLabelInput: React.FC<FormLabelInputProps> = ({
  label,
  children,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="m-4 w-full">
      <label
        className="block font-semibold text-sm text-gray-30"
        htmlFor={field.name}
      >
        {label.toUpperCase()}
      </label>
      <input
        className={`focus:outline-none appearance-none w-full shadow-sm rounded py-2 px-3 leading-tight  focus:ring-2 focus:ring-offset-2 focus-visible:ring-purple-700 bg-[#4a4a4a] border-[#1a1a1a] border${
          error && " border-[#f7022a]"
        }`}
        {...field}
        {...props}
        id={field.name}
      />
      {error && <FormErrorMessage text={error} />}
      {children}
    </div>
  );
};
