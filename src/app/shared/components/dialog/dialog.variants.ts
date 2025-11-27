import { cva, type VariantProps } from 'class-variance-authority';

export const dialogVariants = cva(
  'fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg rounded-lg sm:max-w-[425px]',
);
export type ZardDialogVariants = VariantProps<typeof dialogVariants>;
