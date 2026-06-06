'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SelectProps {
  label?: string;
  error?: string;
  helper?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, label, error, helper, options, placeholder, value, onChange, id, required }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    // Handle click outside to close
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isOpen]);

    const selectedOption = options.find((o) => o.value === value);

    const handleSelect = (val: string) => {
      onChange?.(val);
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-[hsl(var(--color-text))]">
            {label}
            {required && <span className="text-[hsl(var(--color-danger))] ml-1">*</span>}
          </label>
        )}

        <div className="relative" ref={ref}>
          <button
            type="button"
            id={selectId}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={cn(
              'w-full h-10 px-3 rounded-[var(--radius-md)] text-sm text-left flex items-center justify-between',
              'bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text))]',
              'border border-[hsl(var(--color-border))]',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-0 focus:border-[hsl(var(--color-primary))]',
              error && 'border-[hsl(var(--color-danger))] focus:border-[hsl(var(--color-danger))]',
              className,
            )}
          >
            <span className={cn('block truncate', !selectedOption && 'text-[hsl(var(--color-text-muted))]')}>
              {selectedOption ? selectedOption.label : (placeholder || 'Select an option')}
            </span>
            <ChevronDown size={16} className={cn('text-[hsl(var(--color-text-muted))] transition-transform duration-200', isOpen && 'rotate-180')} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1 max-h-60 overflow-auto animate-fade-in-up origin-top">
              <ul role="listbox" className="flex flex-col">
                {placeholder && (
                  <li
                    role="option"
                    aria-selected={!value}
                    onClick={() => handleSelect('')}
                    className="px-3 py-2 text-sm text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] cursor-pointer transition-colors"
                  >
                    {placeholder}
                  </li>
                )}
                {options.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors',
                        isSelected ? 'bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] font-medium' : 'text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface-2))]'
                      )}
                    >
                      <span className="block truncate">{opt.label}</span>
                      {isSelected && <Check size={14} className="shrink-0" />}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="text-xs text-[hsl(var(--color-danger))]">{error}</p>
        )}
        {helper && !error && (
          <p className="text-xs text-[hsl(var(--color-text-muted))]">{helper}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
