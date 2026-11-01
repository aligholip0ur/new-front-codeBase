import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Separator as BaseSeparator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const separatorVariants = cva('', {
  variants: {
    spacing: {
      none: '',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    variant: {
      default: 'bg-border',
      muted: 'bg-neutral-200 dark:bg-neutral-700',
      strong: 'bg-neutral-400 dark:bg-neutral-500',
    },
  },
  defaultVariants: {
    spacing: 'none',
    variant: 'default',
  },
});

export interface CustomSeparatorProps
  extends ComponentPropsWithoutRef<typeof BaseSeparator>, VariantProps<typeof separatorVariants> {
  label?: string;
}

export const Separator = forwardRef<ElementRef<typeof BaseSeparator>, CustomSeparatorProps>(
  ({ className, spacing, variant, orientation = 'horizontal', label, ...props }, ref) => {
    if (label) {
      return (
        <div
          className={cn(
            'flex items-center gap-3',
            orientation === 'vertical' && 'flex-col',
            spacing && separatorVariants({ spacing })
          )}
        >
          <Separator
            orientation={orientation}
            className={cn('flex-1', separatorVariants({ variant }), className)}
          />
          <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">{label}</span>
          <Separator
            ref={ref}
            orientation={orientation}
            className={cn('flex-1', separatorVariants({ variant }), className)}
            {...props}
          />
        </div>
      );
    }

    return (
      <Separator
        ref={ref}
        orientation={orientation}
        className={cn(separatorVariants({ spacing, variant }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
