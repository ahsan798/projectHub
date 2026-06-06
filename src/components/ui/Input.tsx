import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helper, leftIcon, rightIcon, id, ...props },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[hsl(var(--color-text))]"
          >
            {label}
            {props.required && (
              <span className="text-[hsl(var(--color-danger))] ml-1">*</span>
            )}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[hsl(var(--color-text-muted))] pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 px-3 rounded-[var(--radius-md)] text-sm",
              "bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))]",
              "border border-[hsl(var(--color-border))]",
              "placeholder:text-[hsl(var(--color-text-muted))]",
              "transition-all duration-150",
              "focus:outline-none focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.2)]",
              error &&
                "border-[hsl(var(--color-danger))] focus:border-[hsl(var(--color-danger))] focus:ring-[hsl(var(--color-danger)/0.2)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helper
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[hsl(var(--color-text-muted))]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-[hsl(var(--color-danger))] flex items-center gap-1"
          >
            {error}
          </p>
        )}
        {helper && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-[hsl(var(--color-text-muted))]"
          >
            {helper}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
