export const handleRegisterErrors = (
  errorCode: string,
  errorDetail: string
) => {
  if (errorCode === "23505") {
    // TO-DO: Add regex to search for first key: err.detail looks like 'Key (field)=(value)'.  Get field incase someone has email part of their username
    const key: string = errorDetail.includes("email") ? "email" : "username";
    return [
      {
        field: key,
        message: `An account with that ${key} already exists.`,
      },
    ];
  } else {
    return [
      {
        field: "unknown",
        message:
          "an unknown error occurred when trying to register a user.\n" +
          "detail: " +
          errorDetail +
          "\nerror code: " +
          errorCode,
      },
    ];
  }
};
