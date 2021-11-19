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
        <div className="w-full flex min-h-screen justify-center">
          <Form className="w-md flex items-center bg-[#1e1e1e] p-12 align-center self-center rounded-md shadow-md">
            <div className="w-full -m-4">
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
              <button
                type="submit"
                className="m-4 w-full shadow-sm bg-[#383838] py-2 px-4 rounded-md text-purple-300"
              >
                Login
              </button>
              <div className="w-full flex justify-end mx-2">
                <Link href="/forgot-password">
                  <a className="text-xs text-purple-500">Forgot password?</a>
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
