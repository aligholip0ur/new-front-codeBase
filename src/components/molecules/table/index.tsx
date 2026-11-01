import { type ReactNode } from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import {
  Table as BaseTable,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ColumnDef<T> {
  key: string;
  header: ReactNode;
  cell: (row: T, index: number) => ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface RowAction<T> {
  label: ReactNode;
  onClick: (row: T) => void;
  destructive?: boolean;
}

export interface CustomTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  getRowKey?: (row: T, index: number) => string | number;
  caption?: ReactNode;
  footer?: ReactNode;
  actions?: (row: T) => RowAction<T>[];
  emptyMessage?: ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export function Table<T>({
  columns,
  data,
  getRowKey,
  caption,
  footer,
  actions,
  emptyMessage = 'داده‌ای برای نمایش وجود ندارد.',
  onRowClick,
  className,
}: CustomTableProps<T>) {
  const totalColumns = columns.length + (actions ? 1 : 0);

  return (
    <BaseTable className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(col.align && alignClass[col.align], col.className)}
            >
              {col.header}
            </TableHead>
          ))}
          {actions && <TableHead className="w-12" />}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={totalColumns} className="h-24 text-center text-neutral-500">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow
              key={getRowKey ? getRowKey(row, index) : index}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(onRowClick && 'cursor-pointer')}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn(col.align && alignClass[col.align], col.className)}
                >
                  {col.cell(row, index)}
                </TableCell>
              ))}

              {actions && (
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon className="size-4" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      {actions(row).map((action, ai) => (
                        <DropdownMenuItem
                          key={ai}
                          onClick={() => action.onClick(row)}
                          variant={action.destructive ? 'destructive' : 'default'}
                        >
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>

      {footer && <TableFooter>{footer}</TableFooter>}
    </BaseTable>
  );
}

Table.displayName = 'Table';
