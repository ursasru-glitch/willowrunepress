import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "px-6 py-2.5 rounded-full font-medium transition-all duration-300 border focus:outline-none disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-navy border-navy text-primary-bg hover:bg-sage hover:border-sage hover:text-navy"
      : "bg-transparent border-navy/20 text-navy hover:border-sage hover:text-sage";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
};

export const Section: React.FC<{ className?: string; bgColor?: "primary" | "secondary"; children: React.ReactNode }> = ({
  className = "",
  bgColor = "primary",
  children,
}) => {
  const bg = bgColor === "secondary" ? "bg-secondary-bg" : "bg-primary-bg";
  return <section className={`${bg} px-6 md:px-12 py-16 md:py-24 ${className}`}>{children}</section>;
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => {
  return <div className={`bg-white rounded-lg border border-navy/5 shadow ${className}`} {...props} />;
};
