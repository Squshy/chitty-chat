import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FormErrorMessage } from "./FormErrorMessage";

type FormLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const FormLabelInput: React.FC<FormLabelInputProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="m-4 w-full">
      <label
        className="block font-semibold text-md text-purple-500"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        className={`appearance-none w-full shadow-sm rounded py-2 px-3 leading-tight focus:outline-none focus:ring bg-[#6a6a6a] ${
          error && "border-[#f7022a] border"
        }`}
        {...field}
        {...props}
        id={field.name}
      />
      {error && <FormErrorMessage text={error} />}
    </div>
  );
};
