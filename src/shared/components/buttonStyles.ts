type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "icon";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-zinc-900 bg-zinc-900 text-white hover:border-zinc-800 hover:bg-zinc-800",
  secondary:
    "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50",
  ghost:
    "border-transparent bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
  danger:
    "border-red-200 bg-white text-red-700 hover:border-red-300 hover:bg-red-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4",
  icon: "h-9 w-9",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonStyleOptions = {}) {
  return [baseStyles, variantStyles[variant], sizeStyles[size], className]
    .filter(Boolean)
    .join(" ");
}
