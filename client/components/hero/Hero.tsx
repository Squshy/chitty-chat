import React from "react";
import { Header } from "./Header";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div className="w-full p-6 bg-[#1a1a1a] text-center">
      <Header />
    </div>
  );
};
