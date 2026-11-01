import { toast as baseToast } from '@/components/ui/toast';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;

export interface ToastOptions {
  description?: ReactNode;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

const TOAST_TYPE_STYLES: Record<Exclude<ToastType, undefined>, string> = {
  success: 'bg-success-50 border border-success-300 text-success-800 [&_svg]:text-success-600',
  error: 'bg-danger-50 border border-danger-300 text-danger-700 [&_svg]:text-danger-600',
  warning: 'bg-warning-50 border border-warning-300 text-warning-800 [&_svg]:text-warning-600',
  info: 'bg-info-50 border border-info-300 text-info-800 [&_svg]:text-info-600',
  loading: 'bg-silver-50 border border-silver-300 text-silver-700',
};

const DEFAULT_STYLE = 'bg-white border border-silver-200 text-silver-700';

function buildOptions(title: string, type: ToastType, options?: ToastOptions) {
  const id = baseToast.add({
    title,
    description: options?.description,
    type,
    duration: options?.duration,
    className: cn(type ? TOAST_TYPE_STYLES[type] : DEFAULT_STYLE),
    actionProps: options?.onAction
      ? {
          children: options.actionLabel ?? 'واگرد',
          onClick: () => {
            options.onAction?.();
            baseToast.close(id);
          },
        }
      : undefined,
  });
  return id;
}

export const showToast = {
  default: (title: string, options?: ToastOptions) => buildOptions(title, undefined, options),
  success: (title: string, options?: ToastOptions) => buildOptions(title, 'success', options),
  info: (title: string, options?: ToastOptions) => buildOptions(title, 'info', options),
  warning: (title: string, options?: ToastOptions) => buildOptions(title, 'warning', options),
  error: (title: string, options?: ToastOptions) => buildOptions(title, 'error', options),
  loading: (title: string, options?: ToastOptions) => buildOptions(title, 'loading', options),

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    }
  ) {
    return baseToast.promise(promise, messages);
  },

  close: (id: string) => baseToast.close(id),
};
