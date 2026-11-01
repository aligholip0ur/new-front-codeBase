import {
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const dropdownSizes = {
  sm: 'w-[10rem]',
  md: 'w-[13rem]',
  lg: 'w-[16rem]',
  xl: 'w-[20rem]',
} as const;

type DropdownSize = keyof typeof dropdownSizes;

export interface CustomDropdownMenuItem {
  label: ReactNode;
  value?: string;
  icon?: ReactNode;
  shortcut?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

export interface CustomDropdownMenuProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuContent>,
  'children'
> {
  trigger: ReactNode;
  items?: CustomDropdownMenuItem[];
  label?: ReactNode;
  children?: ReactNode;
  size?: DropdownSize;
  className?: string;
}

const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuContent>, CustomDropdownMenuProps>(
  ({ trigger, items, label, children, size = 'md', className, ...props }, ref) => {
    const triggerElement = isValidElement(trigger) ? (
      trigger
    ) : (
      <Button type="button">{trigger}</Button>
    );

    return (
      <BaseDropdownMenu>
        <DropdownMenuTrigger render={triggerElement} />

        <DropdownMenuContent
          ref={ref}
          className={cn(
            'border-border bg-popover text-popover-foreground w-[13rem] rounded-lg border p-1 shadow-md',
            dropdownSizes[size],
            className
          )}
          {...props}
        >
          {label && (
            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium">
              {label}
            </DropdownMenuLabel>
          )}

          {items ? (
            <DropdownMenuGroup>
              {items.map((item, index) => (
                <div key={item.value ?? index}>
                  {item.separator && <DropdownMenuSeparator className="my-1" />}

                  <DropdownMenuItem
                    disabled={item.disabled}
                    onClick={item.onClick}
                    className={cn(
                      'cursor-pointer gap-2 rounded-md px-2 py-2 text-sm',
                      item.destructive && 'text-destructive focus:text-destructive'
                    )}
                  >
                    {item.icon && (
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        {item.icon}
                      </span>
                    )}

                    <span className="flex-1">{item.label}</span>

                    {item.shortcut && (
                      <span className="text-muted-foreground mr-auto text-xs">{item.shortcut}</span>
                    )}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuGroup>
          ) : (
            children
          )}
        </DropdownMenuContent>
      </BaseDropdownMenu>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu };
