import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/dist/client/router";
import React, { useState } from "react";
import { FormErrorMessage } from "../../components/form/FormErrorMessage";
import { FormLabelInput } from "../../components/form/FormLabelInput";
import { Wrapper } from "../../components/form/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import Link from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <div>
      <Wrapper>
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async ({ newPassword }, { setErrors }) => {
            setTokenError("");
            const response = await changePassword({
              variables: { newPassword, token },
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <div className="w-full flex min-h-screen bg-gray-100 justify-center">
              <Form className="w-md flex items-center bg-white p-12 align-center self-center rounded-md shadow-md">
                <div className="space-y-4">
                  <FormLabelInput
                    label="New Password"
                    placeholder="newPassword"
                    name="newPassword"
                    type="password"
                  />
                  {tokenError && (
                    <div className="flex justify-between items-center">
                      <FormErrorMessage text={tokenError} />
                      <Link href="/forgot-password">
                        <a className="text-xs">Forgot Password</a>
                      </Link>
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`${
                      isSubmitting ? "text-red-500" : "text-black"
                    }`}
                  >
                    Change Password
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </Wrapper>
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
