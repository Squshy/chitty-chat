import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { FormWrapper } from "../components/form/FormWrapper";
import { RedirectText } from "../components/form/RedirectText";
import { SubmitButton } from "../components/form/SubmitButton";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [forgotPassword, { data, loading }] = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);
  if (submitted)
    return (
      <Wrapper>
        <div className="w-full flex min-h-screen  justify-center">
          <div className="w-md flex items-center bg-mid p-12 align-center self-center rounded-md shadow-md">
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
        <FormWrapper
          title="Forgot Your Password?"
          subtitle="Enter your email to get instructions to reset your password."
        >
          <FormLabelInput
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
          />
          <SubmitButton text="Forgot Password" />
          <RedirectText text="Suddenly remember?" href="/login" to="login" />
        </FormWrapper>
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
