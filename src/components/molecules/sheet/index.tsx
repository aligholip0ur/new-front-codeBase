import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';

import {
  Sheet as BaseSheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

const sheetSizes = {
  sm: {
    right: 'w-[20rem]',
    left: 'w-[20rem]',
    top: 'h-[20rem]',
    bottom: 'h-[20rem]',
  },

  md: {
    right: 'w-[26rem]',
    left: 'w-[26rem]',
    top: 'h-[26rem]',
    bottom: 'h-[26rem]',
  },

  lg: {
    right: 'w-[35rem]',
    left: 'w-[35rem]',
    top: 'h-[35rem]',
    bottom: 'h-[35rem]',
  },

  xl: {
    right: 'w-[45rem]',
    left: 'w-[45rem]',
    top: 'h-[45rem]',
    bottom: 'h-[45rem]',
  },

  full: {
    right: 'w-full',
    left: 'w-full',
    top: 'h-full',
    bottom: 'h-full',
  },
} as const;

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

type SheetSize = keyof typeof sheetSizes;

export interface CustomSheetProps extends Omit<
  ComponentPropsWithoutRef<typeof SheetContent>,
  'side' | 'children'
> {
  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;

  trigger?: ReactNode;

  title?: ReactNode;

  description?: ReactNode;

  children?: ReactNode;

  footer?: ReactNode;

  side?: SheetSide;

  size?: SheetSize;

  showCloseButton?: boolean;

  scrollable?: boolean;

  className?: string;

  headerClassName?: string;

  bodyClassName?: string;

  footerClassName?: string;
}

const Sheet = forwardRef<ElementRef<typeof SheetContent>, CustomSheetProps>(
  (
    {
      open,
      defaultOpen,
      onOpenChange,

      trigger,

      title,
      description,
      children,
      footer,

      side = 'right',
      size = 'md',

      showCloseButton = true,
      scrollable = true,

      className,
      headerClassName,
      bodyClassName,
      footerClassName,

      ...props
    },
    ref
  ) => {
    const sizeClass = sheetSizes[size][side];

    return (
      <BaseSheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger && <SheetTrigger render={trigger as React.ReactElement} />}

        <SheetContent
          ref={ref}
          side={side}
          showCloseButton={showCloseButton}
          className={cn(
            'flex flex-col gap-0',
            'overflow-hidden',
            'bg-background',
            sizeClass,
            className
          )}
          {...props}
        >
          {(title || description) && (
            <SheetHeader
              className={cn('shrink-0', 'border-border border-b', 'px-6 py-4', headerClassName)}
            >
              {title && <SheetTitle className="text-base font-semibold">{title}</SheetTitle>}

              {description && <SheetDescription>{description}</SheetDescription>}
            </SheetHeader>
          )}

          <div
            className={cn(
              'min-h-0 flex-1',
              'px-6 py-5',
              scrollable && 'overflow-y-auto',
              bodyClassName
            )}
          >
            {children}
          </div>

          {footer && (
            <SheetFooter
              className={cn('shrink-0', 'border-border border-t', 'px-6 py-4', footerClassName)}
            >
              {footer}
            </SheetFooter>
          )}
        </SheetContent>
      </BaseSheet>
    );
  }
);

Sheet.displayName = 'CustomSheet';

export { Sheet };
