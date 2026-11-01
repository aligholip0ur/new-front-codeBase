import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Skeleton as BaseSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('', {
  variants: {
    shape: {
      text: 'h-4 w-full rounded',
      title: 'h-6 w-2/3 rounded',
      avatar: 'size-10 rounded-full',
      thumbnail: 'aspect-video w-full rounded-lg',
      card: 'h-32 w-full rounded-xl',
      button: 'h-10 w-24 rounded-lg',
      custom: '',
    },
  },
  defaultVariants: {
    shape: 'text',
  },
});

export interface CustomSkeletonProps
  extends ComponentPropsWithoutRef<typeof BaseSkeleton>, VariantProps<typeof skeletonVariants> {
  count?: number;
}

export const Skeleton = forwardRef<ElementRef<typeof BaseSkeleton>, CustomSkeletonProps>(
  ({ className, shape, count = 1, ...props }, ref) => {
    if (count > 1) {
      return (
        <div className="flex flex-col gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton
              key={i}
              ref={i === 0 ? ref : undefined}
              className={cn(skeletonVariants({ shape }), className)}
              {...props}
            />
          ))}
        </div>
      );
    }

    return <Skeleton ref={ref} className={cn(skeletonVariants({ shape }), className)} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';
