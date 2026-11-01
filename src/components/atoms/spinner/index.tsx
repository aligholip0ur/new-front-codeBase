import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Spinner as BaseSpinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-12',
    },
    variant: {
      primary: 'text-primary',
      white: 'text-white',
      muted: 'text-neutral-400',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export interface CustomSpinnerProps
  extends ComponentPropsWithoutRef<typeof BaseSpinner>, VariantProps<typeof spinnerVariants> {}

export const Spinner = forwardRef<ElementRef<typeof BaseSpinner>, CustomSpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <Spinner ref={ref} className={cn(spinnerVariants({ size, variant }), className)} {...props} />
    );
  }
);

Spinner.displayName = 'Spinner';
