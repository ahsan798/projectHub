import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:   'gradient-primary text-white shadow-md hover:opacity-90 active:opacity-80',
  secondary: 'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-border))]',
  ghost:     'bg-transparent text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]',
  danger:    'bg-[hsl(var(--color-danger))] text-white hover:opacity-90 active:opacity-80',
  outline:   'border border-[hsl(var(--color-border))] bg-transparent text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]',
};

const sizeStyles: Record<Size, string> = {
  sm:  'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
  md:  'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg:  'h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size="sm" className="mr-1" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
