import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { Checkbox as BaseCheckbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

export interface CustomCheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox> {
  label?: string;
  description?: string;
  error?: string;
  fieldClassName?: string;
}

export const Checkbox = forwardRef<ElementRef<typeof BaseCheckbox>, CustomCheckboxProps>(
  ({ label, description, error, className, fieldClassName, id, disabled, ...props }, ref) => {
    const isInvalid = Boolean(error);

    const checkbox = (
      <BaseCheckbox
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={isInvalid}
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        className={cn('shrink-0', className)}
        {...props}
      />
    );

    // فقط Checkbox
    if (!label && !description && !error) {
      return checkbox;
    }

    return (
      <Field
        orientation="horizontal"
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        className={cn('items-start gap-x-[0.5rem]', fieldClassName)}
      >
        {checkbox}

        <FieldContent className="min-w-0 gap-[0.125rem]">
          {label && (
            <FieldLabel
              htmlFor={id}
              className={cn(
                'cursor-pointer leading-[1.25rem]',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </FieldLabel>
          )}

          {error ? (
            <FieldDescription id={`${id}-error`} className="text-red-500">
              {error}
            </FieldDescription>
          ) : (
            description && (
              <FieldDescription id={`${id}-description`}>{description}</FieldDescription>
            )
          )}
        </FieldContent>
      </Field>
    );
  }
);

Checkbox.displayName = 'Checkbox';
