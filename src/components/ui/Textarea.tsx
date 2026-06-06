import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[hsl(var(--color-text))]"
          >
            {label}
            {props.required && (
              <span className="text-[hsl(var(--color-danger))] ml-1">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={3}
          className={cn(
            "w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm resize-none",
            "bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))]",
            "border border-[hsl(var(--color-border))]",
            "placeholder:text-[hsl(var(--color-text-muted))]",
            "transition-all duration-150",
            "focus:outline-none focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.2)]",
            error && "border-[hsl(var(--color-danger))]",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p role="alert" className="text-xs text-[hsl(var(--color-danger))]">
            {error}
          </p>
        )}
        {helper && !error && (
          <p className="text-xs text-[hsl(var(--color-text-muted))]">
            {helper}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
