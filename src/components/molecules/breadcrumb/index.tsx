import { Fragment, type ReactElement, type ReactNode } from 'react';
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export interface BreadcrumbItemData {
  label: ReactNode;
  href?: string;
  render?: ReactElement;
}

export interface CustomBreadcrumbProps {
  items: BreadcrumbItemData[];
  separator?: ReactNode;
  maxItems?: number;
  className?: string;
  itemClassName?: string;
}

export const Breadcrumb = ({
  items,
  separator,
  maxItems,
  className,
  itemClassName,
}: CustomBreadcrumbProps) => {
  const shouldCollapse = maxItems && items.length > maxItems;

  const visibleItems = shouldCollapse
    ? [items[0], { label: '__ellipsis__' } as BreadcrumbItemData, ...items.slice(-(maxItems! - 1))]
    : items;

  return (
    <BaseBreadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.label === '__ellipsis__';

          return (
            <Fragment key={isEllipsis ? `ellipsis-${index}` : index}>
              <BreadcrumbItem className={itemClassName}>
                {isEllipsis ? (
                  <BreadcrumbEllipsis />
                ) : isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={item.render ?? <a href={item.href ?? '#'} />}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className={cn(separator && 'text-current')}>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
