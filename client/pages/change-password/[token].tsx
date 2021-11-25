import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/dist/client/router";
import React, { useState } from "react";
import { FormErrorMessage } from "../../components/form/FormErrorMessage";
import { FormLabelInput } from "../../components/form/FormLabelInput";
import { Wrapper } from "../../components/Wrapper";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import Link from "next/link";
import { FormWrapper } from "../../components/form/FormWrapper";
import { SubmitButton } from "../../components/form/SubmitButton";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async ({ newPassword }, { setErrors }) => {
          setTokenError("");
          const response = await changePassword({
            variables: { newPassword, token },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.changePassword.user,
                },
              });
            },
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
          <FormWrapper
            title="Change Password"
            subtitle="Don&apos;t forget this one 🥱"
          >
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
            <SubmitButton text="Change Password" />
          </FormWrapper>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
