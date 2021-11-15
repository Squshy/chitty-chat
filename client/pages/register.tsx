import React from "react";
import { Form, Formik } from "formik";
import { FormLabelInput } from "../components/form/FormLabelInput";
import { Wrapper } from "../components/form/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

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
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await register({ variables: { options: values } });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
        }}
      >
        {(values: FormValues, handleChange) => (
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
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
