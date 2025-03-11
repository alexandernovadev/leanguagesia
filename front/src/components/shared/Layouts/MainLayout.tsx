import React from "react";
import { NabvarMain } from "../NabvarMain";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={`text-black-200 h-full flex flex-col overflow-hidden`}>
      {children}
      <NabvarMain />
    </div>
  );
};
