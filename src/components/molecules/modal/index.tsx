import { forwardRef, type ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

const dialogSizes = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  full: 'sm:max-w-[calc(100vw-2rem)]',
} as const;

export type DialogSize = keyof typeof dialogSizes;

export interface CustomDialogProps {
  /**
   * کنترل باز/بسته بودن Modal
   */
  open?: boolean;

  /**
   * مقدار اولیه برای حالت uncontrolled
   */
  defaultOpen?: boolean;

  /**
   * تغییر وضعیت Modal
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * المانی که Modal را باز می‌کند
   */
  trigger?: ReactNode;

  /**
   * عنوان Modal
   */
  title?: ReactNode;

  /**
   * توضیحات Modal
   */
  description?: ReactNode;

  /**
   * محتوای اصلی
   */
  children?: ReactNode;

  /**
   * Footer
   */
  footer?: ReactNode;

  /**
   * اندازه Modal
   */
  size?: DialogSize;

  /**
   * نمایش دکمه بستن
   */
  showCloseButton?: boolean;

  /**
   * اجازه اسکرول محتوای Modal
   */
  scrollable?: boolean;

  /**
   * ارتفاع حداکثری Modal
   */
  maxHeight?: string;

  /**
   * کلاس روی DialogContent
   */
  className?: string;

  /**
   * کلاس روی بخش body
   */
  bodyClassName?: string;

  /**
   * کلاس Header
   */
  headerClassName?: string;

  /**
   * کلاس Footer
   */
  footerClassName?: string;
}

export const Modal = forwardRef<HTMLDivElement, CustomDialogProps>(
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

      size = 'md',

      showCloseButton = true,

      scrollable = true,

      maxHeight = '85vh',

      className,
      bodyClassName,
      headerClassName,
      footerClassName,
    },
    ref
  ) => {
    return (
      <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

        <DialogContent
          ref={ref}
          showCloseButton={showCloseButton}
          className={cn(
            'flex w-full flex-col gap-0',
            dialogSizes[size],

            // Appearance
            'rounded-xl',
            'border-border border',
            'bg-background',

            // Animation
            'duration-200',

            // Prevent overflow
            'overflow-hidden',

            className
          )}
        >
          {(title || description) && (
            <DialogHeader
              className={cn('shrink-0', 'border-border border-b', 'px-2 py-2', headerClassName)}
            >
              {title && <DialogTitle className="text-base font-semibold">{title}</DialogTitle>}

              {description && (
                <DialogDescription className="text-sm">{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          <div
            className={cn(
              'px-3 py-2',

              scrollable && 'overflow-y-auto',

              bodyClassName
            )}
            style={scrollable ? { maxHeight } : undefined}
          >
            {children}
          </div>

          {footer && (
            <DialogFooter
              className={cn('shrink-0', 'border-border border-t', 'px-3 py-2', footerClassName)}
            >
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = 'Modal';
