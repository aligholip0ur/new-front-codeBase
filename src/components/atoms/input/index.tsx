import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CustomInputProps extends ComponentPropsWithoutRef<typeof BaseInput> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const Input = forwardRef<ElementRef<typeof BaseInput>, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      startContent,
      endContent,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            {label}
            {required && <span className="mr-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {startContent && (
            <div className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center">
              {startContent}
            </div>
          )}

          <BaseInput
            {...props}
            ref={ref}
            id={inputId}
            required={required}
            aria-required={required || undefined}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              'min-h-10 rounded-lg',
              'bg-white dark:bg-[#4C4C4C]',
              'text-neutral-700 dark:text-white',
              'placeholder:text-sm',
              'placeholder:text-neutral-400',
              'focus-visible:ring-1',
              'focus-visible:ring-inputTextBorderColor',
              startContent && 'pr-10',
              endContent && 'pl-10',
              error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',
              className
            )}
          />

          {endContent && (
            <div className="absolute top-1/2 left-3 z-10 flex -translate-y-1/2 items-center">
              {endContent}
            </div>
          )}
        </div>

        {error ? (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
