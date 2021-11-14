import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/form/Wrapper";
import { useMutation } from "@apollo/client";
import { useRegisterMutation } from "../generated/graphql";

interface FormValues {
  username: string;
  password: string;
  email: string;
}
interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [register, { data, loading, error }] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          return register({ variables: { options: values } });
        }}
      >
        {(values: FormValues, handleChange) => (
          <div className="w-full flex min-h-screen bg-purple-900 justify-center">
            <Form className="max-w-md flex items-center bg-purple-600 p-12 align-center self-center rounded-md shadow-md">
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
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
