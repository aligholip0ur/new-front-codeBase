import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Loader2 } from 'lucide-react';

import { Button as BaseButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CustomButtonProps extends ComponentPropsWithoutRef<typeof BaseButton> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'relative transition-all duration-200',
          isLoading && 'cursor-wait',
          className
        )}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {loadingText && <span>{loadingText}</span>}
          </span>
        )}

        <span className={cn('flex items-center gap-2', isLoading && 'invisible')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
