import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/form/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [register, { data, loading, error }] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
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
        <div className="w-full flex min-h-screen bg-gray-100 justify-center">
          <Form className="w-md flex items-center bg-white p-12 align-center self-center rounded-md shadow-md">
            <div className="space-y-4">
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
              <button type="submit">Register</button>
            </div>
          </Form>
        </div>
      </Formik>
    </Wrapper>
  );
};

export default Register;
