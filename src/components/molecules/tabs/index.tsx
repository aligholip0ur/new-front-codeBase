import { type ReactNode } from 'react';
import { Tabs as BaseTabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface TabItemData {
  value: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface CustomTabsProps {
  items: TabItemData[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'line';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

export const Tabs = ({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
  orientation = 'horizontal',
  className,
  listClassName,
  contentClassName,
}: CustomTabsProps) => {
  return (
    <BaseTabs
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn(orientation === 'vertical' && 'flex-row', className)}
    >
      <TabsList variant={variant} className={listClassName}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
            {item.icon}
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className={contentClassName}>
          {item.content}
        </TabsContent>
      ))}
    </BaseTabs>
  );
};

Tabs.displayName = 'Tabs';
