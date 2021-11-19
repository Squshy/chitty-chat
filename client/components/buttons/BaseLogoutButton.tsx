import { useApolloClient } from "@apollo/client";
import React, { ButtonHTMLAttributes } from "react";
import { useLogoutMutation } from "../../generated/graphql";

type BaseLogoutButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

export const BaseLogoutButton: React.FC<BaseLogoutButtonProps> = ({
  text,
  children,
  ...props
}) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  return (
    <button
      onClick={() => {
        logout();
        apolloClient.resetStore();
      }}
      {...props}
    >
      {text && text}
      {children}
    </button>
  );
};
