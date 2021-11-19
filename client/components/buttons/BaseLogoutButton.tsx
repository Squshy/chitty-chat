import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
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
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await router.push("/login");
        await logout();
        await apolloClient.resetStore();
      }}
      {...props}
    >
      {text && text}
      {children}
    </button>
  );
};
