import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

import { Textarea as BaseTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface CustomTextareaProps extends ComponentPropsWithoutRef<typeof BaseTextarea> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;

  startContent?: ReactNode;
  endContent?: ReactNode;

  /**
   * نمایش تعداد کاراکترهای وارد شده
   */
  showCharacterCount?: boolean;

  /**
   * نوع تغییر سایز Textarea
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

const Textarea = forwardRef<ElementRef<typeof BaseTextarea>, CustomTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      startContent,
      endContent,
      showCharacterCount = false,
      resize = 'vertical',
      className,
      id,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const currentValue =
      typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : '';

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            {label}

            {required && (
              <span className="mr-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startContent && (
            <div className="absolute top-3 right-3 z-10 flex items-center">{startContent}</div>
          )}

          <BaseTextarea
            {...props}
            ref={ref}
            id={textareaId}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            maxLength={maxLength}
            required={required}
            aria-required={required || undefined}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            className={cn(
              'min-h-24 rounded-lg',
              'bg-white dark:bg-[#4C4C4C]',
              'text-neutral-700 dark:text-white',
              'placeholder:text-sm',
              'placeholder:text-neutral-400',
              'focus-visible:ring-1',
              'focus-visible:ring-inputTextBorderColor',
              resizeClasses[resize],

              startContent && 'pr-10',
              endContent && 'pl-10',

              error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',

              className
            )}
          />

          {endContent && (
            <div className="absolute top-3 left-3 z-10 flex items-center">{endContent}</div>
          )}
        </div>

        {(error || helperText || showCharacterCount) && (
          <div className="flex items-start justify-between gap-2">
            <div>
              {error ? (
                <p id={`${textareaId}-error`} role="alert" className="text-xs text-red-500">
                  {error}
                </p>
              ) : helperText ? (
                <p
                  id={`${textareaId}-helper`}
                  className="text-xs text-neutral-500 dark:text-neutral-400"
                >
                  {helperText}
                </p>
              ) : null}
            </div>

            {showCharacterCount && maxLength && (
              <span className="shrink-0 text-xs text-neutral-400">
                {currentValue.length} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
