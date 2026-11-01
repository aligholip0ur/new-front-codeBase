import { Switch as BaseSwitch } from '@/components/ui/switch';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

export interface CustomSwitchProps {
  id?: string;
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  size?: 'sm' | 'default';
  variant?: 'simple' | 'description' | 'card';
  className?: string;
}

export const Switch = ({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  error,
  size = 'default',
  variant = 'simple',
  className,
}: CustomSwitchProps) => {
  const isInvalid = !!error;

  const switchEl = (
    <BaseSwitch
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      size={size}
      aria-invalid={isInvalid}
      className={variant === 'simple' ? className : undefined}
    />
  );

  if (variant === 'simple') {
    if (!label) return switchEl;

    return (
      <div className="flex items-center gap-3">
        {switchEl}
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Field
        data-invalid={isInvalid || undefined}
        data-disabled={disabled || undefined}
        className={className}
      >
        <FieldLabel
          htmlFor={id}
          className={cn(
            'flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-4',
            'has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5',
            'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60'
          )}
        >
          <FieldContent>
            <span className="font-medium">{label}</span>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
          {switchEl}
        </FieldLabel>
        {error && <FieldDescription className="text-red-500">{error}</FieldDescription>}
      </Field>
    );
  }

  // variant === 'description'
  return (
    <Field
      data-invalid={isInvalid || undefined}
      data-disabled={disabled || undefined}
      className={className}
    >
      <div className="flex items-start justify-between gap-3">
        <FieldContent>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          {error ? (
            <FieldDescription className="text-red-500">{error}</FieldDescription>
          ) : (
            description && <FieldDescription>{description}</FieldDescription>
          )}
        </FieldContent>
        {switchEl}
      </div>
    </Field>
  );
};

Switch.displayName = 'Switch';
