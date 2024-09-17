import React from "react";
import Link from "next/link";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLinkProps = BaseButtonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = (ButtonAsButtonProps & { href?: never }) | ButtonAsLinkProps;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  href,
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-full transition-colors duration-200 focus:outline-none";

  const variantStyles = {
    primary:
      "bg-lightMode-button-background hover:bg-lightMode-button-background/90 text-lightMode-button-text dark:bg-darkMode-button-background dark:hover:bg-darkMode-button-background/90 dark:text-darkMode-button-text",
    secondary:
      "bg-lightMode-brand-secondary hover:bg-lightMode-brand-secondary/90 text-lightMode-text-main dark:bg-darkMode-brand-secondary dark:hover:bg-darkMode-brand-secondary/90 dark:text-darkMode-text-main",
    outline:
      "bg-transparent border-2 border-lightMode-brand-primary hover:bg-lightMode-brand-primary/10 text-lightMode-brand-primary hover:text-lightMode-text-main dark:border-darkMode-brand-primary dark:text-darkMode-brand-primary dark:hover:bg-darkMode-brand-primary/10 dark:hover:text-darkMode-text-main",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(props as Omit<ButtonAsLinkProps, "href" | "className">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(props as ButtonAsButtonProps)}>
      {children}
    </button>
  );
};

export default Button;
