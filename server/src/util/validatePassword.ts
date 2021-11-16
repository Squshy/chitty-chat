export const validatePassword = (password: string, field: string) => {
  if (password.length <= 2) {
    return [
      {
        field: field,
        message: "length must be greater than 2",
      },
    ];
  }
  return null;
};
