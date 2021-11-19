import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FormWrapper } from "../components/form/FormWrapper";
import { SubmitButton } from "../components/form/SubmitButton";
import { RedirectText } from "../components/form/RedirectText";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [login, { data, loading, error }] = useLoginMutation();
  if (error) return <div>{error.message}</div>;
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async ({ usernameOrEmail, password }, { setErrors }) => {
          const response = await login({
            variables: { password, usernameOrEmail },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/home");
          }
        }}
      >
        <FormWrapper title="Login" subtitle="Welcome back!">
          <FormLabelInput
            label="Username or Email"
            placeholder="Username/Email"
            name="usernameOrEmail"
          />
          <FormLabelInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
          >
            <Link href="/forgot-password">
              <a className="text-xs text-purple-500">Forgot password?</a>
            </Link>
          </FormLabelInput>
          <SubmitButton text="Login" />
          <RedirectText
            text="Don't have an account?"
            href="/register"
            to="Register"
          />
        </FormWrapper>
      </Formik>
    </Wrapper>
  );
};

export default Login;
