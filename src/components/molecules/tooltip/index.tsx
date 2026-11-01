import { type ReactNode } from 'react';
import { Tooltip as BaseTooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface CustomTooltipProps {
  children: ReactNode; // المنتی که تریگر تولتیپه
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  shortcut?: string;
  disabled?: boolean; // اگه بخوای موقتاً تولتیپ رو خاموش کنی
}

export const Tooltip = ({
  children,
  content,
  side = 'top',
  shortcut,
  disabled,
}: CustomTooltipProps) => {
  if (disabled) return <>{children}</>;

  return (
    <BaseTooltip>
      <TooltipTrigger render={children as never} />
      <TooltipContent side={side}>
        <p>{content}</p>
        {shortcut && (
          <kbd className="ms-2 rounded bg-black/20 px-1.5 py-0.5 text-xs">{shortcut}</kbd>
        )}
      </TooltipContent>
    </BaseTooltip>
  );
};

Tooltip.displayName = 'Tooltip';
