import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { FormWrapper } from "../components/form/FormWrapper";
import { SubmitButton } from "../components/form/SubmitButton";
import Link from "next/link";

export interface RegisterValues {
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = ({}) => {
  const router = useRouter();
  const [register, { data, loading, error }] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        <FormWrapper title="Register" subtitle="Yeehaw">
          <FormLabelInput
            label="Username"
            placeholder="Username"
            name="username"
          />
          <FormLabelInput
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
          />
          <FormLabelInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
          />
          <SubmitButton text="Register" />
          <p className="mx-4 my-1 text-xs text-[#666666]">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-purple-500">Login</a>
            </Link>
          </p>
        </FormWrapper>
      </Formik>
    </Wrapper>
  );
};

export default Register;
