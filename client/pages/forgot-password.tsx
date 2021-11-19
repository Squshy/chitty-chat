import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [forgotPassword, { data, loading }] = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);
  if (submitted)
    return (
      <Wrapper>
        <div className="w-full flex min-h-screen bg-gray-100 justify-center">
          <div className="w-md flex items-center bg-white p-12 align-center self-center rounded-md shadow-md">
            <p className="">
              If an account with that email exists, an email will be sent with a
              link to change your password.
            </p>
          </div>
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async ({ email }) => {
          await forgotPassword({ variables: { email } });
          setSubmitted(true);
        }}
      >
        <div className="w-full flex min-h-screen bg-gray-100 justify-center">
          <Form className="w-md flex items-center bg-white p-12 align-center self-center rounded-md shadow-md">
            <div className="space-y-4">
              <FormLabelInput
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
              />
              <button type="submit">Forgot Password</button>
            </div>
          </Form>
        </div>
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
