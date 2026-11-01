import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

import { cn } from '@/lib/utils';

export interface EmptyListProps extends Omit<ComponentPropsWithoutRef<typeof Empty>, 'children'> {
  /**
   * Icon or custom media
   */
  icon?: ReactNode;

  /**
   * Empty state description
   */
  description?: ReactNode;

  /**
   * Action buttons / links
   */
  action?: ReactNode;

  /**
   * Custom content
   */
  children?: ReactNode;

  /**
   * Show border around empty state
   */
  bordered?: boolean;

  /**
   * Minimum height
   */
  minHeight?: 'sm' | 'md' | 'lg';
}

const minHeightClasses = {
  sm: 'min-h-[12rem]',
  md: 'min-h-[18rem]',
  lg: 'min-h-[24rem]',
} as const;

const EmptyList = forwardRef<ElementRef<typeof Empty>, EmptyListProps>(
  (
    {
      icon,
      title = 'داده‌ای یافت نشد',
      description,
      action,
      children,
      bordered = false,
      minHeight = 'md',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Empty
        ref={ref}
        className={cn(
          'w-full',
          'px-6 py-8',
          minHeightClasses[minHeight],
          bordered && 'border-border rounded-lg border',
          className
        )}
        {...props}
      >
        <EmptyHeader>
          {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}

          {title && <EmptyTitle>{title}</EmptyTitle>}

          {description && <EmptyDescription>{description}</EmptyDescription>}
        </EmptyHeader>

        {(action || children) && (
          <EmptyContent>
            {action}
            {children}
          </EmptyContent>
        )}
      </Empty>
    );
  }
);

EmptyList.displayName = 'EmptyList';

export { EmptyList };
