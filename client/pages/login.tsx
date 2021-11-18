import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/form/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

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
            router.push("/");
          }
        }}
      >
        <div className="w-full flex min-h-screen bg-gray-100 justify-center">
          <Form className="w-md flex items-center bg-white p-12 align-center self-center rounded-md shadow-md">
            <div className="space-y-4">
              <FormLabelInput
                label="Username/Email"
                placeholder="Username/Email"
                name="usernameOrEmail"
              />
              <FormLabelInput
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
              />
              <div className="flex justify-between items-center">
                <button type="submit">Login</button>
                <Link href="/forgot-password">
                  <a className="text-xs">Forgot password?</a>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </Wrapper>
  );
};

export default Login;
