import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  'group toast group-[.toaster]:shadow-lg group-[.toaster]:border-border',
  {
    variants: {
      variant: {
        default:
          'group-[.toaster]:bg-background group-[.toaster]:text-foreground',

        destructive:
          'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive',

        success:
          'group-[.toaster]:bg-chart-3 group-[.toaster]:text-accent-foreground group-[.toaster]:border-chart-3',

        error:
          'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive',

        warning:
          'group-[.toaster]:bg-chart-4 group-[.toaster]:text-foreground group-[.toaster]:border-chart-4',

        info:
          'group-[.toaster]:bg-chart-1 group-[.toaster]:text-primary-foreground group-[.toaster]:border-chart-1',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ZardToastVariants = {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
};
