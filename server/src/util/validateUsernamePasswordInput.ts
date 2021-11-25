import { UsernamePasswordInput } from "../resolvers/responses/userResponses";
import { validatePassword } from "./validatePassword";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "no @ allowed in usernames ty :)",
      },
    ];
  }
  const validPass = validatePassword(options.password, 'password');
  if (validPass) return validPass;
  return null;
};
