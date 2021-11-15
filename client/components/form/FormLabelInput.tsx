import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FormErrorMessage } from "./FormErrorMessage";

type FormLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const FormLabelInput: React.FC<FormLabelInputProps> = ({label, ...props}) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label
        className="block font-semibold text-md"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        className={`appearance-none w-full shadow-sm rounded py-2 px-3 leading-tight focus:outline-none focus:ring  ${error && 'border-[#DA0037] border'}`}
        {...field}
        {...props}
        id={field.name}
      />
      {error && <FormErrorMessage text={error} />}
    </div>
  );
};
