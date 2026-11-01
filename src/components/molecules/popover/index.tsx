import { type ReactNode } from 'react';
import {
  Popover as BasePopover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface CustomPopoverProps {
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Popover = ({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  align = 'center',
  side = 'bottom',
  className,
}: CustomPopoverProps) => {
  return (
    <BasePopover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger render={trigger as never} />

      <PopoverContent align={align} side={side} className={cn(className)}>
        {(title || description) && (
          <PopoverHeader>
            {title && <PopoverTitle>{title}</PopoverTitle>}
            {description && <PopoverDescription>{description}</PopoverDescription>}
          </PopoverHeader>
        )}

        {children}
      </PopoverContent>
    </BasePopover>
  );
};

Popover.displayName = 'Popover';
