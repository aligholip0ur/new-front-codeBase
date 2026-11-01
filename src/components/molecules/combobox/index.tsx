import { type ReactNode, useMemo } from 'react';
import { XIcon } from 'lucide-react';

import {
  Combobox as BaseCombobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxCollection,
} from '@/components/ui/combobox';

import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';

import { cn } from '@/lib/utils';

export interface CustomComboboxGroup<T> {
  label: string;
  items: T[];
}

interface BaseProps<T, V = T> {
  items: T[] | CustomComboboxGroup<T>[];

  /**
   * Text displayed inside input and used for search
   */
  getItemLabel?: (item: T) => string;

  /**
   * Value stored outside the component.
   *
   * Example:
   * getItemValue={(item) => item.id}
   */
  getItemValue?: (item: T) => V;

  /**
   * Custom rendering for dropdown items
   */
  renderItem?: (item: T) => ReactNode;

  placeholder?: string;
  emptyText?: string;

  label?: string;
  description?: string;
  error?: string;

  disabled?: boolean;

  /**
   * Highlight first matching item
   */
  autoHighlight?: boolean;

  /**
   * Show clear button
   */
  clearable?: boolean;

  className?: string;
  fieldClassName?: string;
  contentClassName?: string;
  itemClassName?: string;

  id?: string;
}

interface SingleProps<T, V = T> extends BaseProps<T, V> {
  multiple?: false;

  value?: V | null;

  onValueChange?: (value: V | null) => void;
}

interface MultipleProps<T, V = T> extends BaseProps<T, V> {
  multiple: true;

  value?: V[];

  onValueChange?: (value: V[]) => void;
}

export type CustomComboboxProps<T, V = T> = SingleProps<T, V> | MultipleProps<T, V>;

function isGrouped<T>(items: T[] | CustomComboboxGroup<T>[]): items is CustomComboboxGroup<T>[] {
  return (
    items.length > 0 && typeof items[0] === 'object' && items[0] !== null && 'items' in items[0]
  );
}

export function Combobox<T, V = T>({
  items,
  getItemLabel = (item) => String(item),
  getItemValue = (item) => item as unknown as V,
  renderItem,
  placeholder = 'انتخاب کنید...',
  emptyText = 'موردی یافت نشد.',
  label,
  description,
  error,
  disabled = false,
  autoHighlight = false,
  clearable = false,
  className,
  fieldClassName,
  contentClassName,
  itemClassName,
  id,
  multiple,
  value,
  onValueChange,
}: CustomComboboxProps<T, V>) {
  const isInvalid = Boolean(error);
  const grouped = isGrouped(items);

  const flatItems = useMemo(
    () => (grouped ? items.flatMap((group) => group.items) : items),
    [items, grouped]
  );

  /**
   * Convert external form value(s) -> actual item(s)
   */
  const selectedItems = useMemo(() => {
    if (multiple) {
      const values = (value as V[] | undefined) ?? [];

      return flatItems.filter((item) =>
        values.some((itemValue) => Object.is(getItemValue(item), itemValue))
      );
    }

    if (value == null) {
      return null;
    }

    return flatItems.find((item) => Object.is(getItemValue(item), value as V)) ?? null;
  }, [flatItems, value, multiple, getItemValue]);

  const handleValueChange = (newValue: T | T[] | null) => {
    if (multiple) {
      const selected = (newValue as T[]) ?? [];

      const values = selected.map((item) => getItemValue(item));

      (onValueChange as ((value: V[]) => void) | undefined)?.(values);

      return;
    }

    const selected = newValue as T | null;

    const result = selected == null ? null : getItemValue(selected);

    (onValueChange as ((value: V | null) => void) | undefined)?.(result);
  };

  const renderItemContent = (item: T) => renderItem?.(item) ?? getItemLabel(item);

  const renderComboboxItem = (item: T) => (
    <ComboboxItem key={String(getItemValue(item))} value={item} className={itemClassName}>
      {renderItem?.(item) ?? getItemLabel(item)}
    </ComboboxItem>
  );
  const comboboxElement = (
    <BaseCombobox
      items={flatItems}
      itemToStringValue={getItemLabel}
      multiple={multiple as true}
      value={selectedItems as never}
      onValueChange={handleValueChange as never}
      disabled={disabled}
      autoHighlight={autoHighlight}
    >
      {multiple ? (
        <ComboboxChips className={cn(isInvalid && 'border-red-500', className)}>
          {(selectedItems as T[] | undefined)?.map((item) => (
            <ComboboxChip key={String(getItemValue(item))}>{getItemLabel(item)}</ComboboxChip>
          ))}

          <ComboboxChipsInput placeholder={placeholder} id={id} aria-invalid={isInvalid} />
        </ComboboxChips>
      ) : (
        <ComboboxInput
          placeholder={placeholder}
          id={id}
          aria-invalid={isInvalid}
          className={cn(isInvalid && 'border-red-500', className)}
        />
      )}

      <ComboboxContent className={contentClassName}>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>

        <ComboboxList>{!grouped ? (item: T) => renderComboboxItem(item) : undefined}</ComboboxList>

        {grouped &&
          items.map((group, index) => (
            <div key={group.label}>
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.label}</ComboboxLabel>

                <ComboboxCollection>{(item: T) => renderComboboxItem(item)}</ComboboxCollection>
              </ComboboxGroup>

              {index < items.length - 1 && <ComboboxSeparator />}
            </div>
          ))}
      </ComboboxContent>

      {clearable && <XIcon className="size-4" />}
    </BaseCombobox>
  );

  if (!label && !description && !error) {
    return comboboxElement;
  }

  return (
    <Field
      data-invalid={isInvalid || undefined}
      data-disabled={disabled || undefined}
      className={fieldClassName}
    >
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <FieldContent>
        {comboboxElement}

        {error ? (
          <FieldDescription className="text-red-500">{error}</FieldDescription>
        ) : (
          description && <FieldDescription>{description}</FieldDescription>
        )}
      </FieldContent>
    </Field>
  );
}

Combobox.displayName = 'Combobox';
