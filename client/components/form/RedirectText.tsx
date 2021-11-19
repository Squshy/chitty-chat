import Link from "next/link";
import React from "react";

interface RedirectTextProps {
  text: string;
  href: string;
  to: string;
}

export const RedirectText: React.FC<RedirectTextProps> = ({
  text,
  to,
  href,
}) => {
  return (
    <p className="mx-4 my-1 text-xs text-[#666666]">
      {text}{" "}
      <Link href={href}>
        <a className="text-purple-500">{to}</a>
      </Link>
    </p>
  );
};
