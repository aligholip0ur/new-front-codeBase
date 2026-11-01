import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { Badge as BaseBadge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export interface CustomBadgeProps extends ComponentPropsWithoutRef<typeof BaseBadge> {
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  isLoading?: boolean;
  href?: string;
}

export const Badge = forwardRef<ElementRef<typeof BaseBadge>, CustomBadgeProps>(
  (
    {
      children,
      className,
      variant = 'default',
      icon,
      iconPosition = 'start',
      isLoading = false,
      href,
      render,
      ...props
    },
    ref
  ) => {
    return (
      <Badge
        ref={ref}
        variant={variant}
        className={cn(className)}
        render={href ? <a href={href} /> : render}
        {...props}
      >
        {isLoading ? (
          <Spinner data-icon={iconPosition === 'end' ? 'inline-end' : 'inline-start'} />
        ) : (
          icon && (
            <span data-icon={iconPosition === 'end' ? 'inline-end' : 'inline-start'}>{icon}</span>
          )
        )}
        {children}
      </Badge>
    );
  }
);

Badge.displayName = 'Badge';
