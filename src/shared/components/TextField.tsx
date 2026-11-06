import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  "data-autofocus"?: boolean;
}

const TextField = ({
  id,
  label,
  hint,
  error,
  className = "",
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-zinc-900"
      >
        {label}
      </label>

      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? descriptionId : undefined}
        className={[
          "h-10 w-full rounded-md border bg-white px-3 text-sm text-zinc-900",
          "placeholder:text-zinc-400 transition-colors",
          "focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10",
          "disabled:cursor-not-allowed disabled:bg-zinc-50",
          error ? "border-red-300" : "border-zinc-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {error ? (
        <p id={descriptionId} role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptionId} className="text-xs text-zinc-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default TextField;
