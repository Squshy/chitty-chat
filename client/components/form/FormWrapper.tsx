import { Form } from "formik";
import React from "react";

interface FormWrapperProps {
  title?: string;
  subtitle?: string;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="w-full flex min-h-screen justify-center">
      <Form className="w-96 flex flex-col bg-mid p-12 my-1 justify-center self-center rounded-md shadow-md">
        {title && (
          <>
            <p className={`text-2xl font-semibold${!subtitle && " mb-4"}`}>
              {title}
            </p>
            {subtitle && (
              <p className="text-sm mb-4 text-gray-300">{subtitle}</p>
            )}
          </>
        )}
        <div className="w-full -m-4">{children}</div>
      </Form>
    </div>
  );
};
