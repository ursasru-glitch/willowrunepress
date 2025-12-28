import React from "react";

type ButtonVariant = "primary" | "secondary";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const base =
    "px-6 py-2.5 rounded-full font-medium transition-all duration-300 border focus:outline-none disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-navy border-navy text-primary-bg hover:bg-sage hover:border-sage hover:text-navy",
    secondary:
      "bg-transparent border-navy text-navy hover:bg-secondary-bg hover:border-navy hover:text-navy",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Section({
  children,
  className = "",
  bgColor,
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: "secondary";
}) {
  const bg = bgColor === "secondary" ? "bg-secondary-bg" : "bg-primary-bg";
  return (
    <section className={`${bg} px-6 md:px-12 py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={`bg-white/50 border border-divider-color/20 rounded-lg shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
