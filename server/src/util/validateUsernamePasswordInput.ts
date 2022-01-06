import { MAX_USERNAME_LENGTH } from "../constants";
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
        message: "Length must be greater than 2",
      },
    ];
  }
  if (options.username.length > MAX_USERNAME_LENGTH) {
    return [
      {
        field: "username",
        message: "Length must be less than " + MAX_USERNAME_LENGTH,
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "No @ allowed in usernames ty :)",
      },
    ];
  }
  const validPass = validatePassword(options.password, "password");
  if (validPass) return validPass;
  return null;
};
