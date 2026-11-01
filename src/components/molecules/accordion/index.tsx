import { type ReactNode } from 'react';
import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

type SingleProps = {
  type?: 'single';
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

type MultipleProps = {
  type: 'multiple';
  collapsible?: never;
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type CustomAccordionProps = (SingleProps | MultipleProps) & {
  items: AccordionItemData[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export const Accordion = ({
  items,
  type = 'single',
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: CustomAccordionProps) => {
  return (
    <BaseAccordion
      type={type as 'single'}
      collapsible={collapsible}
      defaultValue={defaultValue as string}
      value={value as string}
      onValueChange={onValueChange as (value: string) => void}
      className={cn('w-full', className)}
    >
      {items.map(({ value: itemValue, title, content, disabled }) => (
        <AccordionItem
          key={itemValue}
          value={itemValue}
          disabled={disabled}
          className={itemClassName}
        >
          <AccordionTrigger className={triggerClassName}>{title}</AccordionTrigger>
          <AccordionContent className={contentClassName}>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </BaseAccordion>
  );
};

Accordion.displayName = 'Accordion';
