import { type ReactNode } from 'react';

import {
  Select as BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';

import { cn } from '@/lib/utils';

export interface CustomSelectProps<T> {
  /* --------------------------------- Data --------------------------------- */

  items: T[];

  getLabel: (item: T) => string;

  getValue: (item: T) => string;

  getDisabled?: (item: T) => boolean;

  getGroupLabel?: (item: T) => string;

  /* --------------------------------- Value -------------------------------- */

  value?: string | string[] | null;

  onValueChange?: (value: string | string[], item: T | undefined, items: T[]) => void;

  /* --------------------------------- Modes -------------------------------- */

  multiple?: boolean;

  /**
   * حداکثر تعداد آیتم قابل انتخاب در حالت multiple
   */
  maxSelectedItems?: number;

  /* -------------------------------- Content -------------------------------- */

  placeholder?: ReactNode;

  label?: ReactNode;

  helperText?: ReactNode;

  error?: string;

  required?: boolean;

  /* --------------------------------- State --------------------------------- */

  disabled?: boolean;

  readOnly?: boolean;

  /* -------------------------------- Styling -------------------------------- */

  className?: string;

  wrapperClassName?: string;

  labelClassName?: string;

  triggerClassName?: string;

  contentClassName?: string;

  itemClassName?: string;

  groupClassName?: string;

  /* ---------------------------------- HTML --------------------------------- */

  id?: string;

  name?: string;
}

export function Select<T>({
  items,
  getLabel,
  getValue,
  getDisabled,
  getGroupLabel,

  value,
  onValueChange,

  multiple = false,
  maxSelectedItems,

  placeholder = 'انتخاب کنید...',

  label,
  helperText,
  error,

  required = false,

  disabled = false,
  readOnly = false,

  className,
  wrapperClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  groupClassName,

  id,
  name,
}: CustomSelectProps<T>) {
  /* -------------------------------------------------------------------------- */
  /*                                Value Helpers                               */
  /* -------------------------------------------------------------------------- */

  const selectedValues: string[] = multiple ? (Array.isArray(value) ? value : []) : [];

  const selectedValue = multiple ? null : typeof value === 'string' ? value : null;

  const selectedItems = multiple
    ? items.filter((item) => selectedValues.includes(getValue(item)))
    : [];

  const selectedItem = !multiple
    ? items.find((item) => getValue(item) === selectedValue)
    : undefined;

  /* -------------------------------------------------------------------------- */
  /*                              Change Handler                                */
  /* -------------------------------------------------------------------------- */

  const handleValueChange = (newValue: string | string[] | null) => {
    if (newValue === null) {
      return;
    }

    /* ------------------------------ Multiple ------------------------------ */

    if (multiple) {
      const values = Array.isArray(newValue) ? newValue : [newValue];

      if (maxSelectedItems && values.length > maxSelectedItems) {
        return;
      }

      const foundItems = items.filter((item) => values.includes(getValue(item)));

      onValueChange?.(values, undefined, foundItems);

      return;
    }

    /* -------------------------------- Single -------------------------------- */

    if (typeof newValue === 'string') {
      const foundItem = items.find((item) => getValue(item) === newValue);

      onValueChange?.(newValue, foundItem, foundItem ? [foundItem] : []);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              Render Value                                  */
  /* -------------------------------------------------------------------------- */

  const renderValue = (currentValue: string | string[]) => {
    if (!multiple) {
      if (!currentValue) {
        return placeholder;
      }

      const item = items.find((item) => getValue(item) === currentValue);

      return item ? getLabel(item) : placeholder;
    }

    const values = Array.isArray(currentValue) ? currentValue : [];

    if (values.length === 0) {
      return placeholder;
    }

    const selected = items.filter((item) => values.includes(getValue(item)));

    if (selected.length === 0) {
      return placeholder;
    }

    const firstItem = selected[0];

    if (selected.length === 1) {
      return getLabel(firstItem);
    }

    return (
      <span className="truncate">
        {getLabel(firstItem)}
        <span className="text-muted-foreground mr-1">+{selected.length - 1}</span>
      </span>
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              Render Item                                   */
  /* -------------------------------------------------------------------------- */

  const renderItem = (item: T) => {
    const itemValue = getValue(item);

    return (
      <SelectItem
        key={itemValue}
        value={itemValue}
        disabled={getDisabled?.(item)}
        className={itemClassName}
      >
        {getLabel(item)}
      </SelectItem>
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              Render Content                                */
  /* -------------------------------------------------------------------------- */

  let content: ReactNode;

  if (getGroupLabel) {
    const groups = new Map<string, T[]>();

    for (const item of items) {
      const group = getGroupLabel(item);

      if (!groups.has(group)) {
        groups.set(group, []);
      }

      groups.get(group)!.push(item);
    }

    const groupEntries = Array.from(groups.entries());

    content = groupEntries.map(([groupName, groupItems], groupIndex) => (
      <SelectGroup key={groupName} className={groupClassName}>
        <SelectLabel>{groupName}</SelectLabel>

        {groupItems.map(renderItem)}

        {groupIndex < groupEntries.length - 1 && <SelectSeparator />}
      </SelectGroup>
    ));
  } else {
    content = items.map(renderItem);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Select                                    */
  /* -------------------------------------------------------------------------- */

  const selectElement = (
    <BaseSelect
      name={name}
      id={id}
      multiple={multiple}
      items={items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
      }))}
      value={multiple ? selectedValues : selectedValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    >
      <SelectTrigger
        id={id}
        aria-invalid={!!error}
        aria-required={required || undefined}
        className={cn('w-full', className, triggerClassName)}
      >
        <SelectValue placeholder={placeholder}>
          {(currentValue) => renderValue(currentValue)}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className={contentClassName}>{content}</SelectContent>
    </BaseSelect>
  );

  /* -------------------------------------------------------------------------- */
  /*                             Without Wrapper                                */
  /* -------------------------------------------------------------------------- */

  if (!label && !error && !helperText) {
    return selectElement;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Field                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <Field data-invalid={!!error} className={wrapperClassName}>
      {label && (
        <FieldLabel htmlFor={id} className={labelClassName}>
          {label}

          {required && (
            <span className="mr-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </FieldLabel>
      )}

      {selectElement}

      {error ? (
        <FieldError>{error}</FieldError>
      ) : helperText ? (
        <FieldDescription>{helperText}</FieldDescription>
      ) : null}
    </Field>
  );
}

Select.displayName = 'Select';
