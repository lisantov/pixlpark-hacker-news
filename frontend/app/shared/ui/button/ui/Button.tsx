import { type ButtonHTMLAttributes, type MouseEvent } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  onClick?: () => void;
}

const baseClasses = [
  "inline-flex items-center justify-center",
  "px-6 py-3 rounded-lg",
  "text-sm font-medium leading-none whitespace-nowrap",
  "border border-transparent cursor-pointer select-none outline-none",
  "transition-all",
  "duration-200 ease-out",
  "active:scale-[0.98]",
].join(" ");

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
  secondary:
    "bg-orange-50 text-orange-700 hover:bg-orange-100 active:bg-orange-200",
  outline:
    "bg-transparent text-orange-600 border-orange-300 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50 active:bg-orange-100",
  ghost:
    "bg-transparent text-orange-600 hover:bg-orange-50 active:bg-orange-100",
};

export default function Button({
  children,
  onClick = () => 0,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className={classes} {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}
