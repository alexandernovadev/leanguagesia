import React, { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from "react";

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        flex items-center justify-center 
        px-4 py-2 
        rounded-lg 
        transition-colors duration-300 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        border 
        rounded-lg 
        transition-all 
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
