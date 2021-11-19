import Link from "next/link";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { BaseLogoutButton } from "../buttons/BaseLogoutButton";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data } = useMeQuery();

  const Button = () => {
    if (data?.me) {
      return <BaseLogoutButton />;
    } else {
      return (
        <Link href="/login">
          <a>Login</a>
        </Link>
      );
    }
  };

  return (
    <div className="flex justify-between">
      <p className="text-lg font-semibold">Viat</p>
      <Button />
    </div>
  );
};
