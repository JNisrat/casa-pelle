import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant } from "@/lib/types";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white rounded-[46px] px-8 py-4 text-[18px] font-body hover:opacity-90 transition-opacity",
  outlined:
    "bg-white border border-black text-black rounded-[86px] px-10 py-6 text-[18px] font-body hover:bg-black hover:text-white transition-colors",
  send: "bg-[var(--color-primary)] text-white rounded px-8 py-4 text-[18px] font-body hover:opacity-90 transition-opacity",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  variant?: ButtonVariant;
  href: string;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  href,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center cursor-pointer ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
