import { type ReactNode } from 'react';
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';

export interface RadioItemData {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface CustomRadioGroupProps {
  items: RadioItemData[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'simple' | 'description' | 'card';
  legend?: ReactNode;
  legendDescription?: ReactNode;
  error?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  itemClassName?: string;
}

export const RadioGroup = ({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = 'simple',
  legend,
  legendDescription,
  error,
  disabled,
  name,
  className,
  itemClassName,
}: CustomRadioGroupProps) => {
  const isInvalid = !!error;

  const radioGroupEl = (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      className={cn(variant === 'card' && 'gap-3', className)}
    >
      {items.map((item) => {
        const itemId = `${name ?? 'radio'}-${item.value}`;

        if (variant === 'simple') {
          return (
            <div key={item.value} className={cn('flex items-center gap-3', itemClassName)}>
              <RadioGroupItem
                value={item.value}
                id={itemId}
                disabled={item.disabled}
                aria-invalid={isInvalid}
              />
              <Label htmlFor={itemId}>{item.label}</Label>
            </div>
          );
        }

        if (variant === 'card') {
          return (
            <Field key={item.value} data-invalid={isInvalid || undefined} className={itemClassName}>
              <FieldLabel
                htmlFor={itemId}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-lg border p-4',
                  'has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5'
                )}
              >
                <RadioGroupItem
                  value={item.value}
                  id={itemId}
                  disabled={item.disabled}
                  aria-invalid={isInvalid}
                />
                <FieldContent>
                  <span className="font-medium">{item.label}</span>
                  {item.description && <FieldDescription>{item.description}</FieldDescription>}
                </FieldContent>
              </FieldLabel>
            </Field>
          );
        }

        // variant === 'description'
        return (
          <Field key={item.value} data-invalid={isInvalid || undefined} className={itemClassName}>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value={item.value}
                id={itemId}
                disabled={item.disabled}
                aria-invalid={isInvalid}
              />
              <FieldContent>
                <FieldLabel htmlFor={itemId}>{item.label}</FieldLabel>
                {item.description && <FieldDescription>{item.description}</FieldDescription>}
              </FieldContent>
            </div>
          </Field>
        );
      })}
    </BaseRadioGroup>
  );

  if (!legend) {
    return radioGroupEl;
  }

  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      {legendDescription && <FieldDescription>{legendDescription}</FieldDescription>}
      {radioGroupEl}
      {error && <FieldDescription className="text-red-500">{error}</FieldDescription>}
    </FieldSet>
  );
};

RadioGroup.displayName = 'RadioGroup';
