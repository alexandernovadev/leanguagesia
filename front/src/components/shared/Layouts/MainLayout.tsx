import React from "react";
import { NabvarMain } from "../NabvarMain";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className={`bg-gradient-to-b
     from-black-800 via-customGreen-100
      to-customBlack-100 text-black-200
       h-full flex flex-col overflow-hidden`}
    >
      {children}
      <NabvarMain />
    </div>
  );
};
